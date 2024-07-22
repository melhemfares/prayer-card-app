import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { toggleOverlay } from '../app/redux/overlay'

import styles from '../styles/styles'

const Overlay = ({ visible }) => {
  const dispatch = useDispatch()

  if (!visible) return null;
  return <TouchableOpacity 
    style={styles.overlay} 
    onPressIn={() => dispatch(toggleOverlay())}
  />
}

export default Overlay