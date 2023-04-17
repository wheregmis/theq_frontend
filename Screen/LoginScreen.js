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
      <View className="bg-green border h-12 mt-12 mb-12 shadow-md w-60 items-center justify-center rounded-md">
        <Text className="text-1xl font-bold text-black-500">The Q </Text>
      </View>
      <View className="p-8 mt-12 w-full max-w-sm">
        <Text className="text-2xl font-bold mb-6 text-slate-900">Login</Text>

        <Text className="mb-1 mt-2 font-bold">Username</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4 border-black"
          placeholderTextColor="#000"
          placeholder="Enter email address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text className="mb-1 font-bold">Password</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 border-black"
          placeholderTextColor="#000"
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable className="mt-1 mb-5 ">
          <View>
            <Text className="justify-end font-bold text-right">Forgot Password?</Text>
          </View>
        </Pressable>
        <Pressable
          className="h-12 w-40 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
          onPress={handleLogin}
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Sign In</Text>
          </View>
        </Pressable>
      </View>
      <Pressable className="mt-1 mb-5 ">
        <View>
          <Text className="justify-end text-right">
            Not a member yet? <Text className="font-bold">Join Now</Text>
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
