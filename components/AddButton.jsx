import React from 'react'
import { 
  TouchableOpacity,
  Alert
} from 'react-native'

import { Entypo } from '@expo/vector-icons'
import styles from '../styles/styles'

import { useSelector } from 'react-redux'

export default function AddButton({ addHandler, cardName }) {
  const { confirmAdd } = useSelector((state) => state.confirmAdd)
  
  const handleAdd = (event) => {
    event.stopPropagation()

    if (confirmAdd) {
      Alert.alert(
        'Add Card',
        `Are you sure you want to add ${cardName} to your collection?`,
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: addHandler}
        ],
        { cancelable: true }
      )
    } else {
      addHandler()
    }
  }

  return (
    <TouchableOpacity 
      style={styles.plusButton}
      onPress={handleAdd}
    >
      <Entypo name="plus" size={22} color="white" />
    </TouchableOpacity>
  )
}