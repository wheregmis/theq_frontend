import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React from "react";
import userLoginFunction, {
  getCurrentUser,
} from "../controller/user_controller";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { midJourneyImageUrl, urlHasImage } from "../constraints/urls";
import Header from "../Components/Header";
import ArrowDownLeftIcon from "react-native-heroicons/outline";

export default function UserP({ route, navigation }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userImage, setUserImage] = React.useState(null);

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user.data);
        (await urlHasImage(user.data.image))
          ? setUserImage(user.data.image)
          : setUserImage(midJourneyImageUrl);
      } catch (err) {
        alert("Error fetching current user");
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, []);
  console.log(currentUser);

  return (
    <ScrollView>
      <View className="bg-slate-100 items-center justify-center">
        <Header />
        <Pressable
          className="flex-row items-center justify-start mt-6 ml-14 w-full"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <Text className="text-sm ml-2 text-blue-400">Back</Text>
        </Pressable>
        <View className="items-center justify-center mt-10 w-full">
          <QRCode
            value={JSON.stringify({
              user: currentUser?._id,
            })}
            size={200}
            backgroundColor="white"
            color="black"
            logoSize={50}
            logoBackgroundColor="transparent"
          />
          <Text className="mt-2 text-xl">{currentUser?.name}</Text>
          <Image
            className="w-56 h-56 mt-10"
            source={{
              uri: userImage,
            }}
          />
          <View className="p-8 mt-2 w-full">
            <Text className="mb-1">Username Or Email</Text>
            <TextInput
              className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
              placeholderTextColor="#000"
              placeholder="Enter Email Address Or Username"
              value={currentUser?.email}
            />

            <Text className="mb-1">Full Name</Text>
            <TextInput
              className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
              placeholderTextColor="#000"
              placeholder="Enter Your Full Name"
              value={currentUser?.name}
            />

            <Text className="mb-1">Alias Name</Text>
            <TextInput
              className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
              placeholderTextColor="#000"
              placeholder="Enter A Name For You To Be Known As"
              value={currentUser?.aliasName}
            />

            <Text className="mb-1">Describe For Generating AI Image</Text>
            <TextInput
              className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
              placeholderTextColor="#000"
              placeholder="Enter Information Describing You"
              value={currentUser?.aboutYou}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
