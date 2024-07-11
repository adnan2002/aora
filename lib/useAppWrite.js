import { useState, useEffect } from "react";
import { getVideos } from "./appwrite";
import { Alert } from "react-native";


const useAppWrite = (fn)=>{
    const [isLoading, setIsLoading] = useState(false);
  
  const [data, setData] = useState([]);


  const fetchPosts = async ()=>{
    try{
      setIsLoading(true);
      const response = await fn();
      setData(response);
    }catch(err){
      Alert.alert("Err", err.message);
    } finally{
      setIsLoading(false);
    }
  }

  useEffect( ()=>{

     fetchPosts();

  }, [])

  const refetch = fetchPosts;

  return {data, refetch, isLoading}
}


export default useAppWrite