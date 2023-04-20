import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import axios from "axios";
import {
  midJourneyImageUrl,
  urlHasImage,
  userRouteURL,
} from "../constraints/urls";

export default function MessageCard({ message }) {
  const [messageUser, setMessageUser] = React.useState(null);

  const [messageUserImage, setMessageUserImage] = React.useState(null);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${userRouteURL}/${message.userId}`);
        console.log(response.data.data);
        setMessageUser(response.data.data);
        (await urlHasImage(response.data.data.image))
          ? setMessageUserImage(response.data.data.image)
          : setMessageUserImage(midJourneyImageUrl);
      } catch (err) {
        alert("Error fetching queue user");
        console.log(err);
      }
    }

    fetchUser();
  }, [message]);

  return (
    <View className="flex flex-row items-center justify-start m-2 p-2 border-2 border-gray-200">
      <View className="bg-transparent items-center justify-center rounded-md">
        <Pressable
          onPress={() => {
            console.log("pressed");
          }}
        >
          <Image
            source={{
              uri: midJourneyImageUrl,
            }}
            className="h-10 w-10 rounded-full"
          />
        </Pressable>
      </View>
      <View className="w-full ml-6">
        <Text className="text-xl text-bold">{messageUser?.aliasName}</Text>
        <Text className="text-xl">{message.message}</Text>
        <Text className="text-right mr-16 text-sm text-gray-400">
          {message.createdAt}
        </Text>
      </View>
    </View>
  );
}
