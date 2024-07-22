require('dotenv').config()
require('express-async-errors')

//Express + DB setup
const express = require('express')
const db = require('./db')

const app = express()

//Multer
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

//Security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const { v4: uuidv4 } = require('uuid')

//AWS
const { PutObjectCommand } = require('@aws-sdk/client-s3')
const { s3Client, rekognition } = require('./awsConfig')

//Middleware
app.use(express.json({limit: "50mb"}));
app.use(helmet())
app.use(cors())
app.use(xss())

app.use(rateLimiter({
  windowMs: 60 * 1000,
  max: 60
}))

const moderateImage = async (imageData) => {
  const params = {
    Image: {
      Bytes: imageData
    },
    MinConfidence: 50
  }

  try {
    const data = await rekognition.detectModerationLabels(params).promise()
    return data.ModerationLabels
  } catch (error) {
    console.log("Error detecting inappropriate content:", error)
    return []
  }
}

//Uploads card image to AWS S3 bucket and receives a URL
const imageToS3 = async (file) => {
  const bucketRegion = process.env.BUCKET_REGION
  const bucketName = process.env.BUCKET_NAME
  const keyName = `uploads/${Date.now()}.jpg`

  const uploadParams = {
    Bucket: bucketName,
    Key: keyName,
    Body: file.buffer,
    ContentType: file.mimetype
  }

  try {
    const command = new PutObjectCommand(uploadParams)
    await s3Client.send(command)

    const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${keyName}`

    return imageUrl
  } catch (error) {
    console.error('Error uploading image to S3:', error)
    return null
  }
}

//Why not
app.get('/', (req, res) => {
  res.send('Prayer card app API')
})

//Retrieves cards from the database
app.get('/api/cards', async (req, res) => {
  const { search, page, limit } = req.query

  try {
    const query = `SELECT * FROM cards WHERE LOWER(name) LIKE '%${search}%' ORDER BY id DESC LIMIT ${limit}`
    console.log(query)
    const result = await db.query(query)
    res.json(result.rows)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error')
  }
})

//Receives and processes created cards
app.post('/api/cards', upload.single('image'), async (req, res) => {
  const { name, prayer } = req.body
  const file = req.file
  
  try {
    //Detect inappropriate image
    const labels = await moderateImage(file.buffer)

    if (labels.length > 0) {
      const content = []
      labels.forEach((label) => content.push(label['Name']))

      throw new Error(`Inappropriate content detected: ${content.join(', ')}`)
    }

    const imageUrl = await imageToS3(file)

    const query = 'INSERT INTO cards (id, name, image, prayer) VALUES ($1, $2, $3, $4) RETURNING *'
    const values = [uuidv4(), name, imageUrl, prayer]
    const result = await db.query(query, values)
    console.log(result.rows)

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(400).send(error.message);
  }
})

//App listening setup
const port = process.env.PORT || 80

const start = () => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
  })
}

start()