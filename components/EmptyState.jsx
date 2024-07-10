import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import images from '../constants/images'
import CustomButton from './customButton'
import { router } from 'expo-router'

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
      source={images.empty}
      resizeMode='contain'
      className="h-[234]"
      />
    <Text className="font-plight text-sm text-white">{subtitle}</Text>
    <Text className="font-pbold text-3xl text-white mt-3">{title}</Text>
    <CustomButton
    title={"Create a Video"}
    containerStyles={"w-full mt-3"}
    onPress={()=> router.push('/create')}
    />
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({})