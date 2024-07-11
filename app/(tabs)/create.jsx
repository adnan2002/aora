import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import icons from '../../constants/icons'
import { TouchableOpacity } from 'react-native'
import images from '../../constants/images'
import { useGlobalContext } from '../../context/GlobalProvider'
const create = () => {
  const {user} = useGlobalContext();


  return (

    <SafeAreaView className="bg-primary h-full">
      <View className="w-full px-4">
        <Text className="text-white font-psemibold text-xl mt-10">Upload Video</Text>
        <View>
          
        </View>
      </View>
    </SafeAreaView>
  )
}

export default create

const styles = StyleSheet.create({})