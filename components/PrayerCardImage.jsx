import React from 'react'
import { 
  ImageBackground,
  View
} from 'react-native'

import styles from '../styles/styles'

export default function PrayerCardImage({image}) {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{
          uri: image
        }}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
      </ImageBackground>
    </View>
  )
}