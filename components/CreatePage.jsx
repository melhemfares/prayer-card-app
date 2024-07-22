import React, { useState } from 'react'
import { 
  View, 
  ScrollView,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  ActivityIndicator,
  Switch
} from 'react-native'

//Misc
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import { API_HOST } from '@env'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { toggleOverlay } from '../app/redux/overlay'

//Styles
import styles from '../styles/styles'
import { light, dark } from '../styles/theme'
import { COLOURS } from '../constants'

//My custom components
import Overlay from './Overlay';
import PrayerCardView from './PrayerCardView'

//Profanity filter
import Filter from 'bad-words'
const filter = new Filter()
filter.removeWords('hell')

export default function CreatePage() {
  const dispatch = useDispatch()
  const maxLines = 20
  const maxChar = 600

  //State variables
  const [name, setName] = useState('')
  const [prayer, setPrayer] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)

  //Redux variables
  const { overlay } = useSelector((state) => state.overlay)
  const { darkMode } = useSelector((state) => state.darkMode)
  const theme = darkMode ? dark : light;

  //Restricts max number of lines for prayer text field
  const handlePrayer = (input) => {
    const lines = input.split('\n')
    setCharCount(input.length)

    if (lines.length <= maxLines) {
      setPrayer(input)
    } else {
      setPrayer(lines.slice(0, maxLines).join('\n'))
    }
  }

  //Activates the image picker
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'Please enable camera roll permissions to upload images.'
      )
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 5],
        quality: 1,
      })
  
      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    }
  }

  //Previews the created card
  const previewCard = () => {
    dispatch(toggleOverlay())
  }

  //Uploads the created card to the database (Explore page)
  const uploadCard = async () => {
    //Check for profane langauge
    if (filter.isProfane(name) || filter.isProfane(prayer)) {
      Alert.alert(
        'Hold on...',
        'Profane langauge detected'
      )

      return
    }

    setLoading(true)

    //Create form
    const formData = new FormData()
    formData.append('name', name)
    formData.append('prayer', prayer)
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: `${Date.now()}.jpg`,
    })

    //Try post request
    axios.post(`${API_HOST}/api/card`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      Alert.alert(
        'Success!',
        `${name} card has been created!`
      )
    }).catch((error) => {
      Alert.alert(
        'Hold on...',
        error.response.data
      )
    }).finally(() => {
      setName('')
      setPrayer('')
      setImage(null)
      setLoading(false)
    })
  }

  return (
    <View style={[theme.container, { flex: 1 }]}>
      <Overlay visible={overlay}/>
      <ScrollView style={[{ marginHorizontal: '5%' }]} showsVerticalScrollIndicator={false}>
        <View style={{ borderBottomWidth: 1, borderColor: COLOURS.gray2, marginBottom: 10 }}>
          <Text style={[theme.text, styles.header]}>
            Create
          </Text>
        </View>
        <Text style={theme.text}>
          Name
        </Text>
        <TextInput 
          style={[theme.text, styles.nameField]}
          value={name}
          autoComplete='off'
          onChangeText={name => setName(name)}
        />
        <View style={styles.rows}>
          <Text style={[theme.text]}>
            Prayer
          </Text>
          <Text style={{ color: COLOURS.gray, fontFamily: 'DMRegular', }}>
            {charCount}/{maxChar}
          </Text>
        </View>
        <TextInput 
          style={[theme.text, styles.prayerField]}
          multiline
          numberOfLines={10}
          maxLength={maxChar}
          value={prayer}
          autoComplete='off'
          onChangeText={handlePrayer}
        />
        <Text style={[theme.text, { marginBottom: 4 }]}>
          Image
        </Text>
        <Button 
          onPress={pickImage}
          title='Choose Image'
          color={darkMode ? COLOURS.darkPrimary : COLOURS.primary}
        />
        <View style={styles.imagePreviewView}>
          { image != null ?    
            <Image
              style={styles.imagePreview}
              source={{
                uri: image
              }}
            /> :
            <Text style={[styles.grayText, { marginTop: 110, fontFamily: 'DMRegular' }]}>
              Image will appear here
            </Text>
          }
        </View>
        <View style={[styles.rows, { marginBottom: 4 }]}>
          <View style={styles.rows}>
            <Text style={[theme.text, { marginRight: 5 }]}>
              Private
            </Text>
            <Text style={{fontFamily: 'DMRegular', fontStyle: 'italic', color: COLOURS.gray }}>
              (will not appear in Explore)
            </Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isPrivate ? '#f5dd4b' : '#f4f3f4'}
            value={isPrivate}
            onValueChange={() => setIsPrivate(!isPrivate)}
          />
        </View>
        <View style={styles.rows}>
          <View style={styles.button}>
            {loading ? (
              <Text style={theme.text}>
                Card uploading, please don't interrupt...
              </Text>
            ) : (
              <Button
                onPress={previewCard}
                title='Preview'
                color={darkMode ? COLOURS.darkPrimary : COLOURS.primary}
              />
            )}
          </View>
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator 
                size="large" 
                color={darkMode ? COLOURS.darkPrimary : COLOURS.primary}
              />
            ) : (
              <Button
                onPress={uploadCard}
                title='Upload'
                color={darkMode ? COLOURS.darkPrimary : COLOURS.primary}
                disabled={!(name && prayer && image)}
              />
            )}
          </View>
        </View>
      </ScrollView>
      
      { overlay && <PrayerCardView title={name} prayer={prayer} image={image}/> }

    </View>
  )
}
