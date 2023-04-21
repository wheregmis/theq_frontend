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
import { ArrowLeftIcon } from "react-native-heroicons/outline";

const RatingScreen = ({ route, navigation }) => {
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

  return (
    <SafeAreaView>
      <View className="flex flex-col">
        <Header />

        <View>
          <Text className="text-center text-2xl font-bold text-gray-500 mb-4 mt-2">
            {organization?.name}
          </Text>

          <Pressable
            className="flex-row items-center justify-start w-full -mt-10"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon className="h-6 w-6" />
            <Text className="text-sm ml-2 text-blue-400">Back</Text>
          </Pressable>
          <Text className="text-center text-xl font-bold text-gray-500 mb-4 mt-2">
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
