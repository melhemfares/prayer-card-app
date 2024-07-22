import { Stack } from 'expo-router';
import store from './redux/store'
import { Provider } from 'react-redux'

import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

const fetchFonts = () => {
  return Font.loadAsync({
    'DMRegular': require('../assets/fonts/DMSans-Regular.ttf'),
    'DMBold': require('../assets/fonts/DMSans-Bold.ttf'),
  })
}

SplashScreen.preventAutoHideAsync()

const Layout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    fetchFonts()
      .then(() => {
        setFontsLoaded(true)
        SplashScreen.hideAsync()
      })
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  )
}

export default Layout;