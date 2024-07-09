import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from '../../lib/appwrite'
const home = () => {
  return (
    <SafeAreaView>
      <FlatList 
      data={[{id: 1}, {id: 2}]}
      keyExtractor={(item)=> item.id}
      renderItem={({item})=>(
        <Text>{item.id}</Text>
      )}
      ListHeaderComponent={()=>{
        <View className="my-6 px-4 space-y-6 border-2">
          <View className="justify-between items-start ">

          </View>
        </View>
      }}
      
      />
    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({})