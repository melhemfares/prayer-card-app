import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

const TabsLayout = () => {
  return ( 
    <Tabs  
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          padding: 10
        }
      }}>
      <Tabs.Screen name="index"
        options={{
          headerTitle: "",
          title: "Collection",
          tabBarIcon: () => <MaterialCommunityIcons name="cards-outline" size={24} color="black" />
        }} />
      <Tabs.Screen name="explore" 
        options={{
          headerTitle: "",
          title: "Explore",
          tabBarIcon: () => <Ionicons name="search" size={24} color="black" />
        }} />
      <Tabs.Screen name="settings" 
        options={{
          headerTitle: "",
          title: "Settings",
          tabBarIcon: () => <Feather name="settings" size={24} color="black" />
        }} />
    </Tabs>
  )
}

export default TabsLayout;