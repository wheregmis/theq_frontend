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
import useFetchMessages from "../controller/message_controller";
import {
  messageUrl,
  midJourneyImageUrl,
  userRouteURL,
} from "../constraints/urls";
import axios from "axios";
import Header from "../Components/Header";
import { useRecoilState } from "recoil";
import { organizationsAtom } from "../state/atoms";
import { getCurrentUser } from "../controller/user_controller";
import MessageCard from "../Components/MessageCard";

const ChatScreen = ({ route, nativation }) => {
  const { organizationId } = route.params;
  const [organizations, setOrganizations] = useRecoilState(organizationsAtom);

  const organization = organizations.find((org) => org._id === organizationId);
  const [currentUser, setCurrentUser] = React.useState(null);

  const { messages, loading, error } = useFetchMessages(organizationId);
  const [message, setMessage] = useState("");

  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  React.useEffect(() => {
    scrollToBottom();

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

  if (error) {
    console.log(error);
  }

  const messageCard = (message) => {
    // fetch the user from message.userId and display the user's name

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
        <View className="w-full ml-6">
          <Text className="text-xl text-bold">Annonymous</Text>
          <Text className="text-xl">{message.message}</Text>
          <Text className="text-right mr-16 text-sm text-gray-400">
            {message.createdAt}
          </Text>
        </View>
      </View>
    );
  };

  handleSend = async () => {
    try {
      const response = await axios.post(messageUrl, {
        userId: currentUser?._id,
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
      alert("Error sending message");
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View className="flex flex-col h-5/6">
        <Header />

        <View>
          <Text className="text-center text-2xl font-bold text-gray-500 mb-4">
            {organization?.name}
          </Text>
          <Text className="text-center text-2xl font-bold text-gray-500 mb-10">
            Messages and Discussion
          </Text>
        </View>
        <ScrollView
          className="max-h-full"
          ref={scrollViewRef}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        >
          {messages
            ? messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            : null}
        </ScrollView>
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
