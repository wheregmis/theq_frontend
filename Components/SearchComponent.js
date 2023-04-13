import { View, Text, Image, SafeAreaView, TextInput } from "react-native";

export default function SearchComponent() {
  return (
    <View className="flex flex-col w-full items-center justify-center mt-4">
      <Text className="w-5/6 text-md text-gray-600 text-left ml-2">
        Search Organization
      </Text>
      <TextInput
        className="w-5/6 bg-white border border-slate-200 rounded-md h-12  placeholder:font-normal placeholder:text-gray-400 px-4 mt-1"
        placeholder="Type to Search"
      />
    </View>
  );
}
