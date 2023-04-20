import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import Header from "../Components/Header";
import useFetchRatings from "../controller/rating_controller";
import { midJourneyImageUrl } from "../constraints/urls";
import { useRecoilState } from "recoil";
import { organizationsAtom } from "../state/atoms";
import RatingCard from "../Components/RatingCard";

const RatingScreen = ({ route, nativation }) => {
  const { organizationId } = route.params;

  const [organizations, setOrganizations] = useRecoilState(organizationsAtom);

  const organization = organizations.find((org) => org._id === organizationId);

  const { ratings, loading, error } = useFetchRatings(organizationId);

  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, []);

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
        <View className="w-full ml-6">
          <Text className="text-xl text-bold">Annonymous</Text>
          <Text className="text-xl">{rating.rating}</Text>
          <Text className="text-right mr-16 text-sm text-gray-400">
            {rating.createdAt}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View className="flex flex-col">
        <Header />

        <View>
          <Text className="text-center text-2xl font-bold text-gray-500 mb-4">
            {organization?.name}
          </Text>
          <Text className="text-center text-xl font-bold text-gray-500 mb-4">
            Ratings
          </Text>
          <Text className="text-center text-sm font-bold text-gray-500 mb-4">
            Based On Conversation Powered By GPT3.5 Model
          </Text>
        </View>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        >
          {ratings
            ? ratings.map((rating) => (
                <RatingCard key={rating._id} rating={rating} />
              ))
            : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RatingScreen;
