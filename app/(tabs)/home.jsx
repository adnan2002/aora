import { StyleSheet, Text, View, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import EmptyState from '../../components/EmptyState'
import Trending from '../../components/Trending'
import { StatusBar } from 'expo-status-bar'
import { getVideos } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'
import VideoCards from '../../components/VideoCards'
import SearchComponent from '../../components/SearchComponent'

const Home = () => {  
  const {data: posts, refetch, isLoading} = useAppWrite(getVideos);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
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
            <Text className="font-pbold text-3xl text-white">JSMastery</Text>
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
        ListHeaderComponent={() => (
          <View className="px-4 w-full ">
            <Text className="text-white font-pextralight text-lg">Trending Videos</Text>
            <Trending posts={posts} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found!"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator
      />
      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})