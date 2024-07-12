import { StyleSheet, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { TouchableOpacity } from 'react-native'
import icons from '../constants/icons'
import { Video, ResizeMode } from 'expo-av'
const zoomIn = {
  0: {scale: 0.9},
  1: {scale: 1.0}
}

const zoomOut = {
  0: {scale:1},
  1: {scale:0.9}
}

const TrendingItem = ({item, activeItem}) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={500}
    >

      {play ? (
        <Video 
        source={{uri: item?.video}}
        className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
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
    
    ) : (
              <TouchableOpacity className="relative" onPress={()=> setPlay(true)}>
              <Image
              className="w-[175] h-[300] rounded-2xl"
              resizeMode='cover'
              source={{uri: item?.thumbnail}}
              
              />
                <Image 
                    source={icons.play}
                    style={{ position: 'absolute', width: 48, height: 48, top: '50%', left: '50%', transform: [{ translateX: -24 }, { translateY: -24 }] }}
                    resizeMode='contain'
                />
        
        
              </TouchableOpacity>
      )}

    </Animatable.View>
  )
}

const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[1]?.$id);

  const viewableItemsChanges = ({viewableItems})=>{
    if(viewableItems.length > 0){
      setActiveItem(viewableItems[0].key)
    }
  }

  // useEffect(() => {
  //   if (posts && posts.length > 0) {
  //     setActiveItem(posts[1].$id);
  //   }
  // }, [posts]);

  // if (!posts || posts.length === 0) {
  //   return null; // or return a loading indicator
  // }

  return (
    <FlatList
      data={posts}
      onViewableItemsChanged={viewableItemsChanges}
      viewabilityConfig={{itemVisiblePercentThreshold: 70}}
      contentOffset={{x:170}}
      keyExtractor={(post) => post.$id}
      renderItem={({item}) => (
        <TrendingItem 
          item={item}
          activeItem={activeItem}
        />
      )}
      horizontal
    />
  )
}

export default Trending

const styles = StyleSheet.create({})