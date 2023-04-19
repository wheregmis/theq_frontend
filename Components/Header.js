import { View, Text, Image, SafeAreaView, Pressable } from "react-native";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline";
import { StackActions, useNavigation } from "@react-navigation/native";
import userLoginFunction from "../controller/user_controller";
import { midJourneyImageUrl } from "../constraints/urls";
import { getCurrentUser } from "../controller/user_controller";
import React from "react";

export default function Header() {
  const [loggedIn, currentUserData, error, login, logout] = userLoginFunction();
  const [currentUser, setCurrentUser] = React.useState(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user.data);
      } catch (err) {
        alert("Error fetching current user");
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <SafeAreaView className="flex flex-col items-center justify-center">
      <View className="flex flex-row items-center justify-evenly">
        <View className=" bg-transparent items-center justify-center rounded-md">
          <Pressable
            onPress={() => {
              console.log("pressed");
              navigation.navigate("UserProfile");
            }}
          >
            <Image
              source={{
                uri: currentUser?.image,
              }}
              className="h-16 w-16 rounded-full"
            />
          </Pressable>
        </View>
        <View className=" flex flex-row bg-white h-12   w-60 items-center justify-center rounded-md ml-5">
          <Text className="text-1xl font-bold text-gray-500">The </Text>
          <Text className="text-1xl font-bold text-green-700">Q</Text>
        </View>
        <Pressable
          onPress={() => {
            console.log("pressed");
          }}
        >
          <View className=" items-center justify-center rounded-md ml-5">
            <Pressable
              onPress={() => {
                logout();
                navigation.dispatch(StackActions.replace("LoginScreen"));
              }}
            >
              <ArrowLeftOnRectangleIcon className="h-10 w-10 text-red-500" />
            </Pressable>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
