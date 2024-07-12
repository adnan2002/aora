import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import icons from '../../constants/icons'
import { TouchableOpacity } from 'react-native'
import images from '../../constants/images'
import { useGlobalContext } from '../../context/GlobalProvider'
import CustomButton from '../../components/customButton'
import {Video, ResizeMode} from 'expo-av'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'

const create = () => {
  const {user} = useGlobalContext();
  const [titleBorder, setTitleBorder] = useState(false);
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [video, setVideo]= useState(null);
  const [thumbnail, setThumbnail]= useState(null);
  const [promptBorder, setPromptBorder] = useState(false);
  const [uploading, setUploading] = useState(false);


  const openPicker = async (selectType)=>{
      const result = await DocumentPicker.getDocumentAsync({
        type: selectType === 'image' ? ['image/png', 'image/jpg', 'image/jpeg' ] : ['video/mp4', 'video/gif'],

      })

      if(!result.canceled){
        if(selectType === 'image') setThumbnail(result.assets[0])
        if(selectType === 'video') setVideo(result.assets[0])
      }else{
    return Alert.alert("Well well well", "You did not choose anything bro");
    }
    setTimeout(()=>{
      Alert.alert('Document Picked', JSON.stringify(result, null, 2))
    }, 100)


  }

  const submit = async()=>{
    if(!title || !prompt || !thumbnail || !video){
      return Alert.alert("Please fill the form")
    }
    setUploading(true);

    try{
      await createVideo({title: title, prompt: prompt, thumbnail: thumbnail, video: video, creator: user.$id})
        Alert.alert('Success', 'Post uploaded successfully ');
        router.push('/home');
    }catch(err){
      Alert.alert("Err", err.message);
      console.log(err.message)
    }finally{
      setUploading(false);
    }

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="w-full px-4">
          <Text className="text-white font-psemibold text-xl mt-10">Upload Video</Text>
          <View className=" mt-[40px]">
            <Text className="text-white font-pregular text-lg">Video Title</Text>
            <View className={`w-full bg-black-200 px-4 rounded-lg h-[50] mt-[4]  ${titleBorder ? 'border-2 border-secondary' : ''}`}>
              <TextInput
                placeholder="Give your video a title..."
                className="text-white font-pregular flex-1"
                onFocus={()=> setTitleBorder(true)}
                onBlur={()=> setTitleBorder(false)}
                value={title}
                onChangeText={(text)=> setTitle(text)}
                placeholderTextColor={"#7b7b8b"}
              />
            </View>
          </View>
          <View className=" mt-[40px]">
            <Text className="text-white font-pregular text-lg">Upload a Video</Text>

            {video ? (<Video 
            source={{uri: video.uri}}
            resizeMode={ResizeMode.COVER}
            useNativeControls
            isLooping
            className="w-full h-[140] rounded-2xl"
            
            />) : (            <View className={`w-full bg-black-200 px-4 rounded-lg  mt-[4] `}>
              <TouchableOpacity  onPress={()=> openPicker('video')}
                className="text-white font-pregular w-full h-[140] flex items-center justify-center"          
              >
                <View className="border-[1px] border-secondary-100 border-dashed rounded-lg p-3">
                  <Image 
                    source={icons.upload}
                    className="w-[40] h-[40] "
                  />
                </View>
              </TouchableOpacity>
            </View>)}

          </View>
          <View className=" mt-[40px]">
            <Text className="text-white font-pregular text-lg">Choose a Thumbnail</Text>


            {thumbnail ? (
              <Image
              source={{uri: thumbnail.uri}}
              resizeMode='contain'
              className="w-[120] h-[120] rounded-2xl"
              
              
              />
            ): (
              <View className={`w-full bg-black-200 px-4 rounded-lg  mt-[4] `}>
              <TouchableOpacity onPress={()=> openPicker('image')}
                className="text-white font-pregular w-full h-[60] flex items-center justify-center"          
              >
                <View className="flex justify-between items-center gap-2  flex-row">
                  <Image 
                    source={icons.upload}
                    className="w-[20] h-[20] "
                  />
                <Text className="text-white font-pregular text-sm">Choose a file</Text>
                </View>
              </TouchableOpacity>
            </View>
            )}

          </View>
          <View className=" mt-[40px]">
            <Text className="text-white font-pregular text-lg">AI Prompt</Text>
            <View className={`w-full bg-black-200 px-4 rounded-lg h-[50] mt-[4] ${promptBorder ? 'border-2 border-secondary-100' : ''} `}>
              <TextInput
                placeholder="The prompt you used to create a video..."
                className="text-white font-pregular flex-1"
                onFocus={()=> setPromptBorder(true)}
                onBlur={()=> setPromptBorder(false)}
                value={prompt}
                onChangeText={(text)=> setPrompt(text)}
                placeholderTextColor={"#7b7b8b"}
              />
            </View>
          </View>
          
          <CustomButton title="Submit & Publish" containerStyles={"mt-[40px] mb-[20px]"} isLoading={uploading} onPress={submit}/>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default create

const styles = StyleSheet.create({})