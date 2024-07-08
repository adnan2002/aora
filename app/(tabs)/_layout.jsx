import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons  from '../../constants/icons'


const TabIcon = ({icon, color, name, focused})=>{
  return (
    <View className=" flex flex-col gap-1">
      <Image 
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6 self-center "
      
      />
      <Text className={`${focused && 'text-secondary-200' } font-pregular self-center  text-xs`} style={{color:color}}>
        {name}
      </Text>
    </View>
  )
}


const _layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#FFA001',
      tabBarStyle:{
        height: 90,
        backgroundColor: '#161622'
      }
    }}>  
        <Tabs.Screen name="home" options={{title:"Home", headerShown: false, tabBarIcon: ({ focused,  color})=>(
          <TabIcon
          name="Home"
          icon={icons.home}
          color={color}
          focused={focused}
          />
        ) }}/>
          <Tabs.Screen name="bookmark" options={{title:"Bookmark",headerShown: false, tabBarIcon: ({ focused,  color})=>(
          <TabIcon
          name="Bookmark"
          icon={icons.bookmark}
          color={color}
          focused={focused}
          />
        )}}/>
        <Tabs.Screen name="create"   options={{title:"Create", headerShown: false, tabBarIcon: ({ focused,  color})=>(
          <TabIcon
          name="Create"
          icon={icons.plus}
          color={color}
          focused={focused}
          />
        )}}/>

        <Tabs.Screen name="profile"  options={{title:"Profile", headerShown: false, tabBarIcon: ({ focused,  color})=>(
          <TabIcon
          name="Profile"
          icon={icons.profile}
          color={color}
          focused={focused}
          />
        )}}/>
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})