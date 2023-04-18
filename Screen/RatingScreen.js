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
import useFetchMessages from "../controller/message_controller";
import { messageUrl, midJourneyImageUrl } from "../constraints/urls";
import axios from "axios";
import Header from "../Components/Header";

const RatingScreen = ({ route, nativation }) => {
  const { organizationId } = route.params;

  const { messages, loading, error } = useFetchMessages(organizationId);
  const [message, setMessage] = useState("");

  if (error) {
    console.log(error);
  }

  const messageCard = (message) => {
    return (
      <View
        key={message._id}
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
          <Text>{message.message}</Text>
        </View>
        <View>
          <Text className="text-end text-sm text-gray-400">
            {message.createdAt}
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
            Messages and Discussion
          </Text>
        </View>

        {messages ? messages.map((message) => messageCard(message)) : null}
      </View>
    </SafeAreaView>
  );
};

export default RatingScreen;
