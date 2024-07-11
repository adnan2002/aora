import {  Text, View, Image } from 'react-native'
import React, {useState} from 'react'
import icons from '../constants/icons'
import { TouchableOpacity } from 'react-native'
import { Video, ResizeMode } from 'expo-av'


const VideoCards = ({data: {title, $id, thumbnail, prompt, video, creators:{avatar, username}}}) => {
    
    const [play, setPlay] = useState(false);
  return (
    <View className="m-6 flex flex-col ">
      <View className="flex flex-row">
       
        <Image 
        source={{uri: avatar}}
        resizeMode='contain'
        className="w-[50] h-[50] rounded-lg border-[1px] border-secondary-100 "
        />
        <View className="flex-1 flex justify-center px-4">
            <Text className="text-white font-pmedium">{title}</Text>
            <Text className="text-white font-plight text-xs mt-2">{username}</Text>
        </View>
        <View className="flex items-center justify-center">
            <TouchableOpacity>
            <Image 
            source={icons.menu}
            resizeMode='contain'
            className="h-[20]"
            
            
            />
            </TouchableOpacity>
        </View>
     
        

      </View>

      {play ? (
              <Video 
              source={{uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
              className="w-full h-60 rounded-xl mt-3"
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        isLooping
        onPlaybackStatusUpdate={(status)=>{
          if(status.didJustFinish){
            setPlay(false);
          }
        }}
        
        onError={(error) => console.error('Video Error:', error)}
        onLoad={() => console.log('Video loaded successfully')}
      />
      
      )
      
      : 
    <TouchableOpacity activeOpacity={0.7} style={{ position: 'relative', marginTop: 10 }} onPress={()=> setPlay(true)}>
        <Image 
            source={{ uri: thumbnail }}
            style={{ width: '100%', height: 190, borderRadius: 12, marginTop: 4 }} 
            resizeMode='cover'
        />
        <Image 
            source={icons.play}
            style={{ position: 'absolute', width: 48, height: 48, top: '50%', left: '50%', transform: [{ translateX: -24 }, { translateY: -24 }] }}
            resizeMode='contain'
        />
    </TouchableOpacity>
      }
  
    </View>
  )
}

export default VideoCards

