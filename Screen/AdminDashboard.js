import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import userLoginFunction from "../controller/user_controller";

export default function LoginScreen({ route, navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, currentUserData, error, login, logout] = userLoginFunction();

  function handleLogin() {
   
    try {
      login(email, password);
      currentUserData && navigation.navigate("UserDashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className="flex-1 items-center pt-12 justify-start bg-slate-50">
      <View className="bg-white h-12 mt-12 mb-12 shadow-md w-60 items-center justify-center rounded-md">
        <Text className="text-1xl font-bold text-gray-500">The Q </Text>
      </View>
      <View className="p-8 mt-12 w-full max-w-sm">
        <Text className="text-2xl font-bold mb-6 text-slate-900">Add Organization</Text>

        <Text className="mb-1">Organizational email</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter Establishment Name"
         
          
        />
                <Text className="mb-1">Organizational Name</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter email address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text className="mb-1">Password</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4"
          placeholderTextColor="#000"
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Pressable
          className="h-12 w-60 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
         
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Add Organization</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
