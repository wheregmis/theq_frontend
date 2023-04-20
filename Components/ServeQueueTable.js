import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import axios from "axios";
import {
  midJourneyImageUrl,
  urlHasImage,
  userRouteURL,
} from "../constraints/urls";

export default function ServeQueueTable({ queue }) {
  console.log(queue);
  const [queueUser, setQueueUser] = React.useState(null);
  const [queueUserImage, setQueueUserImage] = React.useState(null);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${userRouteURL}/${queue.user}`);
        console.log(response.data.data);
        setQueueUser(response.data.data);
        (await urlHasImage(response.data.data.image))
          ? setQueueUserImage(response.data.data.image)
          : setQueueUserImage(midJourneyImageUrl);
      } catch (err) {
        alert("Error fetching queue user");
        console.log(err);
      }
    }

    fetchUser();
  }, [queue]);

  return (
    <View className="flex flex-row items-center justify-start m-5 p-5 border-2 border-gray-200">
      <View className="bg-transparent items-center justify-center rounded-md">
        <Pressable>
          <Image
            source={{
              uri: queueUserImage,
            }}
            className="h-10 w-10 rounded-full"
          />
        </Pressable>
      </View>
      <View className="w-full ml-6">
        <Text className="text-xl">{queueUser?.aliasName}</Text>
        <Text className="text-left mr-16 text-sm text-gray-400">
          Joined Queue At {queue.joinedAt}
        </Text>
      </View>
    </View>
  );
}
