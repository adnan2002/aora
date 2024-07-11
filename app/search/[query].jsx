import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React , {useState, useEffect} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppWrite from '../../lib/useAppWrite'
import { searchPosts } from '../../lib/appwrite'
import images from '../../constants/images'
import SearchComponent from '../../components/SearchComponent'
import { StatusBar } from 'expo-status-bar'
import EmptyState from '../../components/EmptyState'
import VideoCards from '../../components/VideoCards'
const Query = () => {
  const {query} = useLocalSearchParams();

  const {data:posts,refetch} = useAppWrite(()=>searchPosts(query));

 

  useEffect(()=>{refetch()},[query])



  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="my-6 px-4 space-y-6 ">
        <View className="flex justify-between flex-row mb-6  items-center">
          <View>
            <Text className="font-plight text-sm text-white">Search Results</Text>
            <Text className="font-pbold text-3xl text-white">{query}</Text>
          </View>
          <View>
            <Image source={images.logoSmall} resizeMode='contain' className="w-[40] h-[40]"/>
          </View>
        </View>
        <View>
        <SearchComponent />

        </View>
      </View>

      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCards data={item} />
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found!"
            subtitle="Be the first to upload a video"
          />
        )}
        showsVerticalScrollIndicator
      />
      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Query

const styles = StyleSheet.create({})