import React, { useContext } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";

export default function OrganizationInfoCard() {
  return (
    <View>
      <View className="border-1 p-5  bg-white shadow-xl w-80 rounded-xl mb-6">
        {/* Header for Project List */}
        <View className="flex flex-row px-3 mt-3 rounded-md mb-12">
          <Image
            source={{
              uri: "https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png",
            }}
            className="rounded-xl mx-auto h-20 w-20"
          />
        </View>
        <View className="flex flex-row px-3 mt-3">
          <Text className=" w-full text-5md font-bold  text-left">
            Tim Hortons
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center px-3 mt-1">
          <Text className="w-full  text-5md text-gray-500 font-bold mb-2 ">
            263 Yorkland blvd
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center h-11 rounded-md px-3 mt-1 border-2 w-40 mx-auto">
          <Text className="text-5md text-gray-500 font-bold">14 in Queue</Text>
        </View>
      </View>
    </View>
  );
}
