import { Alert } from 'react-native';
import { Avatars, Client, Databases, Query, Storage } from 'react-native-appwrite';
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
const storage = new Storage(client);
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


export const getVideos = async()=>{
    try{
        const videos = await database.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCOllectionId);
        if(videos.documents.length === 0){
            console.log("There are no videos bruh");
        }
        if(!videos){
            throw Error;
        }


        return videos.documents;
    }catch(err){
        console.log("Err", err.message);

    }
}


export const searchPosts = async (query) => {
    try {
        const videos = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCOllectionId,
            [Query.search('title', query)]
        );

        if (!videos || videos.documents.length === 0) {
            console.log("There are no videos bruh");
            return [];
        }

        return videos.documents;
    } catch (err) {
        console.log("Error:", err.message);
        return []; // Return an empty array or handle the error as needed
    }
};




export const getFilePreview = async(id, type)=>{
let fileURL;

try{
    if(type === 'video'){
        fileURL = await storage.getFilePreview(appwriteConfig.storageId,id);
    }else if(type === 'image'){
        fileURL = await storage.getFilePreview(appwriteConfig.storageId,id, 2000, 2000, 'top', 100)
    } else{
        throw new Error ('Invalid file type')
    }
    if(!fileURL ) throw Error;


    return fileURL;

}catch(Err){
throw new Error;
}

}


const UPLOAD_TIMEOUT = 300000; // 5 minutes timeout

const uploadWithProgress = async (file, type) => {
  return new Promise((resolve, reject) => {
    let timeoutId;

    const uploadTask = storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      {
        name: file.name,
        type: file.mimeType,
        size: file.size,
        uri: file.uri
      },
      [],
      (progress) => {
        console.log(`${type} upload progress: ${progress.progress}%`);
        // You can use this to update a progress bar in the UI
      }
    );

    timeoutId = setTimeout(() => {
      reject(new Error(`${type} upload timed out`));
    }, UPLOAD_TIMEOUT);

    uploadTask
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};

export const createVideo = async (data) => {
  try {
    console.log("Creating video with data:", data);

    let thumbnailURL, videoURL;

    // Upload thumbnail
    try {
      const uploadedThumbnail = await uploadWithProgress(data.thumbnail, 'Thumbnail');
      thumbnailURL = await getFilePreview(uploadedThumbnail.$id, 'image');
      console.log("Thumbnail uploaded:", thumbnailURL);
    } catch (thumbnailError) {
      console.error("Failed to upload thumbnail:", thumbnailError);
      Alert.alert("Upload Error", "Failed to upload thumbnail. Please try again.");
      return;
    }

    // Upload video
    try {
      const uploadedVideo = await uploadWithProgress(data.video, 'Video');
      videoURL = await getFilePreview(uploadedVideo.$id, 'video');
      console.log("Video uploaded:", videoURL);
    } catch (videoError) {
      console.error("Failed to upload video:", videoError);
      Alert.alert("Upload Error", "Failed to upload video. Please try again.");
      return;
    }

    if (!thumbnailURL || !videoURL) {
      throw new Error("Failed to upload thumbnail or video");
    }

    // Create document
    const newPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCOllectionId,
      ID.unique(),
      {
        title: data.title,
        prompt: data.prompt,
        thumbnail: thumbnailURL,
        video: videoURL,
        creators: data.creator
      }
    );

    console.log("New post created:", newPost);
    Alert.alert("Success", "Video uploaded successfully!");

    return newPost;
  } catch (err) {
    console.error("Error creating video:", err);
    Alert.alert("Error", `Failed to create video: ${err.message}`);
  }
};

  export const uploadFile = async (file, type) => {
    if (!file) return null;
    
    const { uri, name, size, mimeType } = file;
    
    try {
      console.log("Uploading file:", { type, mimeType, uri, name, size });
      
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,  // bucketId
        ID.unique(),               // fileId
        {
          name: name,
          type: mimeType,
          size: size,
          uri: uri
        },
        [],  // permissions (empty array for default permissions)
        (progress) => {
          console.log(`Upload progress: ${progress.progress}%`);
        }
      );
  
      console.log("Uploaded file result:", uploadedFile);
  
      if (!uploadedFile || !uploadedFile.$id) {
        throw new Error("File upload failed: No file ID received");
      }
  
      const fileURL = await getFilePreview(uploadedFile.$id, type);
      console.log("File preview URL:", fileURL);
  
      return fileURL;
    } catch (err) {
      console.error("Error uploading file:", err);
      throw new Error(`Failed to upload file: ${err.message}`);
    }
  };