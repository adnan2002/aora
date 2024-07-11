import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Query = () => {
  const query = useLocalSearchParams()
  return (
    <View>
      <Text className="text-white text-3xl">{query}</Text>
    </View>
  )
}

export default Query

const styles = StyleSheet.create({})