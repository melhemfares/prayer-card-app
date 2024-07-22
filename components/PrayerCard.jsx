import React from 'react'
import { 
  View,
  Text,
} from 'react-native'

import PrayerCardImage from './PrayerCardImage'
import { useSelector } from 'react-redux'
import { light, dark } from '../styles/theme'

export default function PrayerCard({name, image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2FoNFztYrjisKytpNypxcpYf_tQqGme8q5Q&s'}) {
  const { darkMode } = useSelector((state) => state.darkMode)
  const theme = darkMode ? dark : light;

  return (
    <View style={{ width: '100%' }}>
      <PrayerCardImage image={image}/>
      <Text style={[ theme.text, {
        padding: 10,
        fontSize: 16,
        textAlign: 'center'
      }]}>
        {name}
      </Text>
    </View>
  )
}