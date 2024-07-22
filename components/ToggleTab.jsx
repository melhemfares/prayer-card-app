import React from 'react';
import {View, Text, Switch} from 'react-native';
import styles from '../styles/styles'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ToggleTab({ name, toggle, setToggle, theme }) {
  //Updates the setting in local storage
  const changeSetting = async () => {
    try {
      setToggle()
      await AsyncStorage.setItem(name, (toggle ? '0' : '1'))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.settingTab, theme.settingTab]}>
        <Text style={[styles.setting, theme.text]}>
          { name }
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={toggle ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={changeSetting}
          value={toggle}
        />
      </View>
    </View>
  )
}
