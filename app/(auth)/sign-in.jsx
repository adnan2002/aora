import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import CustomButton from '../../components/customButton';
import images from '../../constants/images';
import icons from '../../constants/icons';
import { Link, router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { signIn } from '../../lib/appwrite';

const SignIn = () => {
    const [passwordHidden, setIsPasswordHidden] = useState(true);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [result, setResult] =useState(null);
    const [submitting, setSubmitting] = useState(false);

    const {setIsLoggedIn, setUser} = useGlobalContext();

    const handleSubmit = async ()=>{
        if(!email || !password){
            Alert.alert("Error", "Please fill all the fields");
        }

        setSubmitting(true);
        try{
            const result = await signIn(email, password);
            setUser(result);
            setIsLoggedIn(true);
            router.push('/home');
        }
        catch(err){
            console.log("Error: ", err);
            Alert.alert("Error", err.message);
        } finally{
            setSubmitting(false);
        }
    }



    return (
        <SafeAreaView className="h-full bg-primary">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="min-h-[85vh] px-4 flex justify-center items-center">
                        <View className="w-[327px] h-[568px] flex flex-col justify-between">
                            <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
                            <Text className="text-white text-lg font-psemibold">Sign In</Text>
                            <View>
                                <Text className="text-white text-lg font-plight">Email</Text>
                                <View className={`w-full h-[45px] rounded-lg bg-black-200 mt-2 ${isEmailFocused ? 'border-2 border-secondary-100' : ''}`}>
                                    <TextInput
                                        className="w-full h-full text-white px-2 font-pbold"
                                        placeholder="example@gmail.com"
                                        placeholderTextColor="#7b7b8b"
                                        inputMode="email"
                                        keyboardType="email-address"
                                        onFocus={() => setIsEmailFocused(true)}
                                        onBlur={() => setIsEmailFocused(false)}
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text className="text-white text-lg font-plight">Password</Text>
                                <View className={`w-full h-[45px] rounded-lg bg-black-200 mt-2 flex flex-row ${isPasswordFocused ? 'border-2 border-secondary-100' : ''}`}>
                                    <TextInput
                                        className="flex-1 text-white px-2 font-pbold"
                                        placeholder="Enter Password"
                                        placeholderTextColor="#7b7b8b"
                                        secureTextEntry={passwordHidden}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                    <TouchableOpacity className="flex justify-center items-center" onPress={() => setIsPasswordHidden(prev => !prev)}>
                                        <Image source={passwordHidden ? icons.eyeHide : icons.eye} resizeMode='contain' className="h-7 w-7 mr-3" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <CustomButton title="Sign In" onPress={handleSubmit} isLoading={false} containerStyles={""} textStyles={""} />
                            <View className="flex justify-center items-center">
                                <Text className="text-white text-sm font-plight">
                                    Don't have an account?{' '}
                                    <Link href="/sign-up" className="text-secondary-100 font-pbold">Sign Up</Link>
                                </Text>
                                {result && <View>
                                        <Text className="text-white">{result.username}</Text>
                                        <Text className="text-white">{result.password}</Text>
                                    </View>}
                                
                            </View>
                        </View>
                    </View>
                    <StatusBar style="light" />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default SignIn

const styles = StyleSheet.create({})