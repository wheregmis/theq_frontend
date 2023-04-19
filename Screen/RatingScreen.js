import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import Header from "../Components/Header";
import useFetchRatings from "../controller/rating_controller";
import { midJourneyImageUrl } from "../constraints/urls";

const RatingScreen = ({ route, nativation }) => {
  const { organizationId } = route.params;

  const { ratings, loading, error } = useFetchRatings(organizationId);

  console.log(ratings);

  // if (error) {
  //   console.log(error);
  // }

  const ratingCard = (rating) => {
    return (
      <View
        key={rating._id}
        className="flex flex-row items-center justify-start m-2 p-2 border-2 border-gray-200"
      >
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
        <View className="items-start">
          <Text>{rating.rating}</Text>
        </View>
        <View>
          <Text className="text-end text-sm text-gray-400">
            {rating.createdAt}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View className="flex flex-col h-5/6">
        <Header />

        <View>
          <Text className="text-center text-2xl font-bold text-gray-500 mb-10">
            Organization {organizationId}
          </Text>
          <Text className="text-center text-2xl font-bold text-gray-500 mb-10">
            Ratings
          </Text>
        </View>

        {ratings ? ratings.map((rating) => ratingCard(rating)) : null}
      </View>
    </SafeAreaView>
  );
};

export default RatingScreen;
