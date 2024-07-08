import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, onPress, containerStyles, textStyles, isLoading}) => {
  return (
<TouchableOpacity onPress={onPress} disabled={isLoading} activeOpacity={0.7} className={`min-h-[58px] rounded-lg flex justify-center items-center bg-secondary-100 ${containerStyles}`}>
    <Text className={`text-primary font-pbold self-center ${textStyles}`}>{title}</Text>
  </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})