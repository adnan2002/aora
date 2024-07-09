import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import CustomButton from '../../components/customButton';
import images from '../../constants/images';
import icons from '../../constants/icons';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { Alert } from 'react-native';

const SignUp = () => {
    const [passwordHidden, setIsPasswordHidden] = useState(true);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async() => {
           if(email || username || password){
            Alert.alert('Error', 'Please fill in all the fields')
           }

           setSubmitting(true);
           

           try{
            const result = await createUser(username, email, password);
        
            router.push('/home');
           }catch(err){
            Alert.alert('Error', err.message);
           }finally{
            setSubmitting(false);
           
           }



    };

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
                            <Text className="text-white text-lg font-psemibold">Sign Up</Text>
                        <View>
                                <Text className="text-white text-lg font-plight">Username</Text>
                                <View className={`w-full h-[45px] rounded-lg bg-black-200 mt-2 ${isUsernameFocused ? 'border-2 border-secondary-100' : ''}`}>
                                    <TextInput
                                        className="w-full h-full text-white px-2 font-pbold"
                                        placeholder="Enter Username"
                                        placeholderTextColor="#7b7b8b"
                                        autoFocus={true}
                                        onFocus={() => setIsUsernameFocused(true)}
                                        onBlur={() => setIsUsernameFocused(false)}
                                        value={username}
                                        onChangeText={setUsername}
                                    />
                                </View>
                            </View>
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
                            <CustomButton title="Sign Up" onPress={handleSubmit} isLoading={false} containerStyles={""} textStyles={""} />
                            <View className="flex justify-center items-center">
                                <Text className="text-white text-sm font-plight">
                                    Already have an account?{' '}
                                    <Link href="/sign-in" className="text-secondary-100 font-pbold">Login</Link>
                                </Text>
                                
                            </View>
                        </View>
                    </View>
                    <StatusBar style="light" />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUp;

const styles = StyleSheet.create({});
