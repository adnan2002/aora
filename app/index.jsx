import { StatusBar } from 'expo-status-bar';
import { Text, View,  Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import CustomButton from '../components/customButton.jsx';
import images from '../constants/images';
import { router } from 'expo-router';
import 'react-native-url-polyfill/auto'


export default function App() {
  return (
    <>
    <SafeAreaView className=" h-full bg-primary">
      <ScrollView contentContainerStyle={{height: '100%'}}>
      <View className="h-full flex justify-center items-center flex-col gap-10">
      <Image source={images.logo} resizeMode='contain' className="h-[40]"/>
      <Image source={images.cards} resizeMode='contain' className="h-[300]"/>
      <Text className="text-3xl font-pbold text-center text-white">Discover Endless Possibilities with <Text className="text-secondary-100">Aora</Text></Text>
      <Image source={images.path} className="w-[136px] h-[15px] absolute top-[510] right-0" resizeMode='contain' />
      <Text className="text-center text-white font-pmedium ">Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
      <View>
      <CustomButton
      title={"Continue to Email"}
      onPress={()=> {router.navigate('/sign-up')}}
      containerStyles={"w-[300]"}
      textStyles={""}
      isLoading={false}
      
      />
      </View>
      
      </View>
      <StatusBar style="light" />
      
    </ScrollView>
      
    </SafeAreaView>
    

    </>
  );
}

