import React from 'react'
import { 
  TouchableOpacity,
  Alert
} from 'react-native'

import { Entypo } from '@expo/vector-icons'
import styles from '../styles/styles'

import { useSelector } from 'react-redux'

export default function DeleteButton({ deleteHandler, cardName }) {
  const { confirmDelete } = useSelector((state) => state.confirmDelete)
  
  const handleDelete = (event) => {
    event.stopPropagation()
    
    if (confirmDelete) {
      Alert.alert(
        'Delete Card',
        `Are you sure you want to delete ${cardName} from your collection?`,
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: deleteHandler}
        ],
        { cancelable: true }
      )
    } else {
      deleteHandler()
    }
  }

  return (
    <TouchableOpacity 
      style={styles.xButton}
      onPress={handleDelete}
    >
      <Entypo name="cross" size={22} color="white" />
    </TouchableOpacity>
  )
}