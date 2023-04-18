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

const ChatScreen = ({ route, nativation }) => {
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

  handleSend = async () => {
    try {
      const response = await axios.post(messageUrl, {
        userId: "64265b21ac4949abe4ca5ee5",
        organizationId: organizationId,
        message: message,
      });
      setMessage("");
      if (response.status === 200) {
        console.log(response.data);
      }
      // todo: Store the token in the local storage
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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

      <View className="flex flex-row mb-4 mt-10 p-5">
        <TextInput
          placeholder="Type your Message"
          className="w-4/5 border border-gray-400 rounded-lg py-2 px-4 mb-4"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button className="flex-1" title="Send" onPress={handleSend} />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
