import { Client } from 'react-native-appwrite';
import { Account } from 'react-native-appwrite';
import { ID } from 'react-native-appwrite';
export default appwriteConfig ={
endpoint: "https://cloud.appwrite.io/v1",
platform: 'com.jsm.aora',
projectId: '668d1d40002fe7f12eeb',
databaseId: '668d1e7c001e9f0c3487',
userCollectionId: '668d1e9a00128e33dd5d',
videoCOllectionId: '668d1ede0027593904d8',
storageId: '668d210000366ef5f844'
}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

export const createUser = async (username, email, password)=>{
    try{
    const account = new Account(client);
    await account.create(ID.unique(), email, password, username)
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}catch(err){
    console.log(err);
    throw new err;
}
}




