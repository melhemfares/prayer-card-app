import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles'
import ToggleTab from './ToggleTab'

//Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../app/redux/darkMode';
import { toggleConfirmAdd } from '../app/redux/confirmAdd';
import { toggleConfirmDelete } from '../app/redux/confirmDelete';

//Theme
import { light, dark } from '../styles/theme'

export default function SettingsPage() {
  const dispatch = useDispatch()

  const { darkMode } = useSelector((state) => state.darkMode)
  const { confirmAdd } = useSelector((state) => state.confirmAdd)
  const { confirmDelete } = useSelector((state) => state.confirmDelete)

  const theme = darkMode ? dark : light;

  return (
    <View style={[theme.container, { flex: 1, alignItems: 'center' }]}>
      <Text style={[theme.text, styles.header]}>
        Settings
      </Text>
      <ToggleTab 
        name='Dark mode' 
        toggle={darkMode} 
        setToggle={() => dispatch(toggleDarkMode())}
        theme={theme}
      />
      <ToggleTab 
        name='Confirm adding a card' 
        toggle={confirmAdd} 
        setToggle={() => dispatch(toggleConfirmAdd())}
        theme={theme}
      />
      <ToggleTab 
        name='Confirm deleting a card' 
        toggle={confirmDelete} 
        setToggle={() => dispatch(toggleConfirmDelete())}
        theme={theme}
      />
    </View>
  )
}
