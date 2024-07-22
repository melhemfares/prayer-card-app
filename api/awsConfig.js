const { S3Client } = require('@aws-sdk/client-s3');
const AWS = require('aws-sdk')
require('dotenv').config()

const region = process.env.BUCKET_REGION
const key = process.env.ACCESS_KEY
const secretKey = process.env.SECRET_KEY

const configParams = {
  region: region,
  credentials: {
    accessKeyId: key,
    secretAccessKey: secretKey
  }
}

const s3Client = new S3Client(configParams)
AWS.config.update(configParams)

const rekognition = new AWS.Rekognition()

module.exports = { 
  s3Client,
  rekognition
}