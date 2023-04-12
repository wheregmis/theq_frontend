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
    <View className="flex-1 items-center justify-center bg-slate-50">
      <View className="p-8 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 text-slate-900">Login</Text>

        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter email address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4"
          placeholderTextColor="#000"
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Pressable
          className="h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-6 mt-4"
          onPress={handleLogin}
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Login</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
