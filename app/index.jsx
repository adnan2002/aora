import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <>
    <SafeAreaView className="flex flex-1 items-center justify-center bg-primary">
      <Text className="text-3xl font-pblack">This is the app</Text>
      <Link href="/home">Click here bro trust me bro</Link>
      <TouchableOpacity className="w-[300] h-[60] rounded-lg flex justify-center items-center bg-secondary-100">
        <Text className="text-primary font-pbold self-center">Continue to Email</Text>
      </TouchableOpacity>
    </SafeAreaView>
    <StatusBar style="light" />

    </>
  );
}

