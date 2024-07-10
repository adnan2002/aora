import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const Trending = ({posts}) => {
  return (
    <FlatList
    data={posts}
    keyExtractor={(post)=> post.$id}
    renderItem={({item})=>(

        <View className="m-7 border-4">
        <Text className="text-white">{item.title}</Text>
        </View>
    )}
    horizontal
    />

  )
}

export default Trending

const styles = StyleSheet.create({})