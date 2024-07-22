import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import { light, dark } from '../../styles/theme'

import { COLOURS } from '../../constants/theme'

import { disableOverlay } from '../redux/overlay';

const TabsLayout = () => {
  const dispatch = useDispatch()

  const handleTabPress = () => {
    dispatch(disableOverlay())
  }

  const { darkMode } = useSelector((state) => state.darkMode)
  const theme = darkMode ? dark : light;

  return ( 
    <Tabs  
      screenOptions={{
        tabBarStyle: [theme.settingTab, {
          height: "10%",
          padding: "2%",
          paddingBottom: "2%",
        }],
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: darkMode ? COLOURS.darkPrimary : COLOURS.primary,
        tabBarInactiveTintColor: darkMode ? COLOURS.white : COLOURS.black
      }}>
      <Tabs.Screen 
        name="index"
        options={{
          headerTitle: "",
          title: "Collection",
          tabBarIcon: ({ focused }) => 
            <MaterialCommunityIcons 
              name={focused ? "cards" : "cards-outline"} 
              size={24} 
              color={focused ? (darkMode ? COLOURS.darkPrimary : COLOURS.primary) : (darkMode ? COLOURS.white : COLOURS.black)}
            />
        }}
        listeners={{
          tabPress: handleTabPress
        }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{
          headerTitle: "",
          title: "Explore",
          tabBarIcon: ({ focused }) => 
            <Ionicons 
              name="search" 
              size={24} 
              color={focused ? (darkMode ? COLOURS.darkPrimary : COLOURS.primary) : (darkMode ? COLOURS.white : COLOURS.black)}
            />
        }}
        listeners={{
          tabPress: handleTabPress
        }}  
      />
      <Tabs.Screen 
        name="create" 
        options={{
          headerTitle: "",
          title: "Create",
          tabBarIcon: ({ focused }) => 
            <AntDesign 
              name={focused ? "plussquare" : "plussquareo"}
              size={24} 
              color={focused ? (darkMode ? COLOURS.darkPrimary : COLOURS.primary) : (darkMode ? COLOURS.white : COLOURS.black)}
            />
        }}
        listeners={{
          tabPress: handleTabPress
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{
          headerTitle: "",
          title: "Settings",
          tabBarIcon: ({ focused }) => 
            <Ionicons 
              name={focused ? "settings" : "settings-outline"}
              size={24} 
              color={focused ? (darkMode ? COLOURS.darkPrimary : COLOURS.primary) : (darkMode ? COLOURS.white : COLOURS.black)}
            />
        }}
        listeners={{
          tabPress: handleTabPress
        }} 
      />
    </Tabs>
  )
}

export default TabsLayout;