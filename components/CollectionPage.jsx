import * as React from 'react';
import { View, Text } from 'react-native';

export default function Collection() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => alert('This is the Collection Screen')}
        style={{ fontSize: 26, fontWeight: 'bold'}}>
        Collection
      </Text>
    </View>
  )
}