import React, { forwardRef, useState } from 'react'
import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import { usePathname } from 'expo-router';
import icons from '../constants/icons'

const SearchComponent = forwardRef(({ onChangeText, ...props }, ref) => {
  const pathName = usePathname();
  const [query, setQuery] = useState('');
  const [borderSearch, setBorderSearch] = useState(false);

  const handleChangeText = (text) => {
    setQuery(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const handleSearchIcon = () => {
    ref?.current?.focus();
  };

  return (
    <View className={`w-full h-[45px] rounded-lg bg-black-200 mt-2 flex flex-row ${borderSearch ? 'border-[2px] border-secondary-100' : ''}`}>
      <TextInput
        ref={ref}
        className="flex-1 text-white px-2 font-pbold"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        onFocus={() => setBorderSearch(true)}
        onBlur={() => setBorderSearch(false)}
        {...props}
      />
      <TouchableOpacity className="flex items-center justify-center px-4" onPress={handleSearchIcon}>
        <Image 
          source={icons.search}
          className="w-[20] h-[20]"
        />
      </TouchableOpacity>
    </View>
  );
});

export default SearchComponent