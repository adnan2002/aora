import { Avatars, Client, Databases } from 'react-native-appwrite';
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
const avatars = new Avatars(client);
const account = new Account(client);
const database = new Databases(client);

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

export const createUser = async (username, email, password)=>{
    try{
    const account = new Account(client);
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

