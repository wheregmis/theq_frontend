import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import axios from "axios";
import {
  midJourneyImageUrl,
  urlHasImage,
  userRouteURL,
} from "../constraints/urls";

export default function RatingCard({ rating }) {
  const [ratingUser, setRatingUser] = React.useState(null);

  const [ratingUserImage, setRatingUserImage] = React.useState(null);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${userRouteURL}/${rating.userId}`);
        console.log(response.data.data);
        setRatingUser(response.data.data);
        (await urlHasImage(response.data.data.image))
          ? setRatingUserImage(response.data.data.image)
          : setRatingUserImage(midJourneyImageUrl);
      } catch (err) {
        alert("Error fetching queue user");
        console.log(err);
      }
    }

    fetchUser();
  }, [rating]);

  console.log(rating.userId);

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
              uri: ratingUserImage,
            }}
            className="h-10 w-10 rounded-full"
          />
        </Pressable>
      </View>
      <View className="w-full ml-6">
        <Text className="text-xl text-bold">{ratingUser?.aliasName}</Text>
        <Text className="text-xl">{rating.rating}</Text>
        <Text className="text-right mr-16 text-sm text-gray-400">
          {rating.createdAt}
        </Text>
      </View>
    </View>
  );
}
