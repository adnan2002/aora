import { Alert } from 'react-native';
import { Avatars, Client, Databases } from 'react-native-appwrite';
import { Account } from 'react-native-appwrite';
import { ID } from 'react-native-appwrite';

export default appwriteConfig ={
endpoint: "https://cloud.appwrite.io/v1",
platform: 'com.jsm.aora',
projectId: '668d1d40002fe7f12eeb',
databaseId: '668d1e7c001e9f0c3487',
userCollectionId: '668d6538000a1f96a93a',
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


const avatars = new Avatars(client);
const account = new Account(client);
const database = new Databases(client);
export const createUser = async (username, email, password)=>{
    try{
    const id = ID.unique();
    const newAccount = await account.create(id, email, password, username)
    if(!newAccount) throw new Error;

    const avatarurl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await database.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, id, {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarurl
    });

    return newUser;

}catch(err){
    console.log(err);
    throw new err;
}
}


export const signIn = async (email, password)=>{
    try{
        const session = await account.createEmailPasswordSession(email, password);

        return session;

    }catch(err){
        console.log(err);
        throw new err;
    }


}


export const getCurrentUser = async ()=>{
    try{
        const currentAccount = await account.get();
        if(!currentAccount){
            throw new Error;
        }
        const userObj = await database.getDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, currentAccount.$id);
        if(!userObj) throw new Error;
        return userObj;
    }catch(err){
        console.log(err);
    }
}

export const signOut = async () => {
    try {
        await account.deleteSession('current');
        console.log('User signed out successfully');
    } catch (err) {
        console.log(err);
        throw new err;
    }
}


