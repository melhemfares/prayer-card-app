import * as React from 'react';
import { View, Text } from 'react-native';

export default function SettingsPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => alert('This is the Settings Screen')}
        style={{ fontSize: 26, fontWeight: 'bold'}}>
        Settings
      </Text>
    </View>
  )
}
