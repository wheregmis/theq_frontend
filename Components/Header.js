import { View, Text, Image, SafeAreaView } from "react-native";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline";

export default function Header() {
  return (
    <SafeAreaView className="flex flex-col items-center justify-center">
      <View className="flex flex-row items-center justify-evenly">
        <View className="shadow-md bg-transparent items-center justify-center rounded-md">
          <Image
            source={{
              uri: "https://www.vhv.rs/dpng/d/426-4263064_circle-avatar-png-picture-circle-avatar-image-png.png",
            }}
            className="h-16 w-16 rounded-full"
          />
        </View>
        <View className=" flex flex-row bg-white h-12  shadow-md w-60 items-center justify-center rounded-md ml-5">
          <Text className="text-1xl font-bold text-gray-500">The </Text>
          <Text className="text-1xl font-bold text-green-700">Q</Text>
        </View>
        <View className="shadow-md items-center justify-center rounded-md ml-5">
          <ArrowLeftOnRectangleIcon className="h-10 w-10 text-red-500" />
        </View>
      </View>
    </SafeAreaView>
  );
}
