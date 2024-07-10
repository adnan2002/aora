import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, TextInput, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import icons from '../../constants/icons'
import EmptyState from '../../components/EmptyState'
import Trending from '../../components/Trending'
import { StatusBar } from 'expo-status-bar'
import { getVideos } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
const home = () => {  
  const {data: posts, refetch, isLoading} = useAppWrite(getVideos);
  const [searchInput, setSearchInput] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  console.log(posts);
  const onRefresh = async ()=>{
    setRefreshing(true);
    await refetch();

    setRefreshing(false);
  }

  

  return (

    <SafeAreaView className="bg-primary h-full">
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
          
          <View className={`w-full h-[45px] rounded-lg bg-black-200 mt-2 flex flex-row`}>
                                    <TextInput
                                        className="flex-1 text-white px-2 font-pbold"
                                        placeholder="Search for a video topic"
                                        placeholderTextColor="#7b7b8b"
                                        onChangeText={newText => setSearchInput(newText)}
                                        defaultValue={searchInput}
                                    />
                                    <TouchableOpacity className="flex items-center justify-center px-4">
                                      <Image 
                                      source={icons.search}
                                      className="w-[20] h-[20]"

                                      />
                                    </TouchableOpacity>
          </View>
          
        </View>
      <FlatList 
      data={[{id:1}]}
      keyExtractor={(item)=> item.id}
      renderItem={({item})=>(
        <Text className="text-white">{item.id}</Text>
      )}
      ListHeaderComponent={()=>{
        return (
          <View className="px-4 w-full ">
            <Text className="text-white font-pextralight text-lg">Trending Videos</Text>
          <Trending posts={
            posts
          } />
          </View>
        )
      }}
      ListEmptyComponent={()=>{
        return (
            <EmptyState
            title="No videos found!"
            subtitle="Be the first to upload a video"
            />
        );
      }}

      refreshControl={<RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      
      />}
      showsVerticalScrollIndicator
      />
      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({})