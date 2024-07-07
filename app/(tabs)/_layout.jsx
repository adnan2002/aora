import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>  
        <Tabs.Screen name="home"     options={{title:"home" }}/>
        <Tabs.Screen name="create"   options={{title:"create"}}/>
        <Tabs.Screen name="bookmark" options={{title:"bookmark"}}/>
        <Tabs.Screen name="profile"  options={{title:"profile"}}/>

    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})