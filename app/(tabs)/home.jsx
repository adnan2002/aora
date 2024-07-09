import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from '../../lib/appwrite'
import images from '../../constants/images'
const home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
      data={[{id: 1}, {id: 2}]}
      keyExtractor={(item)=> item.id}
      renderItem={({item})=>(
        <Text className="text-white">{item.id}</Text>
      )}
      ListHeaderComponent={()=>(
        <View className="my-6 px-4 space-y-6 ">
          <View className="flex justify-between flex-row mb-6  items-center">
            <View>
              <Text className="font-plight text-sm text-white">Welcome Back</Text>
              <Text className="font-pbold text-3xl text-white">
              JSMastery
            </Text>
            </View>
            <View >
              <Image source={images.logoSmall} resizeMode='contain' className="w-[40] h-[40]"/>
            </View>


          </View>
          <View className="h-[40] w-[40] border-2">

          </View>
        </View>
  )}
      
      />
    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({})