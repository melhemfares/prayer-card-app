import React, { useState } from 'react'
import { 
  ImageBackground,
  TouchableOpacity,
  Text
} from 'react-native'

//Styles
import styles from '../styles/styles'
import { COLOURS } from '../constants'

export default function PrayerCardView({title, prayer, image}) {
  const [cardFront, setCardFront] = useState(true)

  //Default avatar image
  if (!image) {
    image = 'https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg'
  }

  if (cardFront) {
    return (
      <TouchableOpacity 
        style={[styles.cardView]}
        onPress={() => setCardFront(!cardFront)}  
      >
        <ImageBackground
          source={{
            uri: image
          }}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
        </ImageBackground>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity 
        style={[styles.cardView, {backgroundColor: COLOURS.tertiary}]}
        onPress={() => setCardFront(!cardFront)}  
      >
        <Text style={[styles.header]}>
          {title}
        </Text>
        <Text style={[styles.prayer]}>
          {prayer}
        </Text>
      </TouchableOpacity>
    )
  }
}