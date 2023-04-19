import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import userLoginFunction, {
  getCurrentUser,
} from "../controller/user_controller";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import { userRouteURL } from "../constraints/urls";

export default function LoginScreen({ route, navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, currentUserData, error, login, logout] = userLoginFunction();
  const [isSignIn, setIsSignIn] = React.useState(true);

  React.useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          user?.data.type == "user"
            ? navigation.dispatch(StackActions.replace("UserDashboard"))
            : navigation.dispatch(StackActions.replace("AdminDashboard"));
        }
      } catch (err) {
        alert("Error fetching current user");
        console.log(err);
      }
    };

    checkLogin();
  }, []);

  const signInBody = () => {
    return (
      <View className="p-8 mt-12 w-full max-w-sm">
        <Text className="text-2xl font-bold mb-6 text-slate-900">Login to</Text>

        <Text className="mb-1">Username</Text>
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
        <Pressable className="mt-1 mb-5 ">
          <View>
            <Text className="justify-end text-right">Forgot Password?</Text>
          </View>
        </Pressable>
        <Pressable
          className="h-12 w-40 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
          onPress={() => {
            handleLogin();
          }}
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Sign In</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const signUpBody = () => {
    return (
      <View className="p-8 mt-12 w-full max-w-sm">
        <Text className="text-2xl font-bold mb-6 text-slate-900">
          Sign Up to
        </Text>

        <Text className="mb-1">Username</Text>
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
        <Pressable className="mt-1 mb-5 ">
          <View>
            <Text className="justify-end text-right">Forgot Password?</Text>
          </View>
        </Pressable>
        <Pressable
          className="h-12 w-40 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
          onPress={() => handleSignUp()}
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Sign Up</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  async function handleLogin() {
    console.log("handleLogin");
    try {
      await login(email, password);
      console.log("currentUser", currentUserData);
    } catch (err) {
      alert("Invalid email or password");
      console.log(err);
    }
  }

  async function handleSignUp() {
    try {
      const response = await axios.post(userRouteURL, {
        name: "test",
        email: email,
        password: password,
      });
      console.log(response);

      if (response.status == 200) {
        alert("Sign Up success");
      }
    } catch (err) {
      alert("Sign Up failed");
      console.log(err);
    }
  }

  if (currentUserData?.data.type == "user") {
    navigation.dispatch(StackActions.replace("UserDashboard"));
  }
  if (currentUserData?.data.type == "admin") {
    navigation.dispatch(StackActions.replace("AdminDashboard"));
  }

  return (
    <View className="flex-1 items-center pt-12 justify-start bg-slate-50">
      <View className="bg-white h-12 mt-12 mb-12 w-60 items-center justify-center rounded-md">
        <Text className="text-1xl font-bold text-gray-500">The Q </Text>
      </View>
      {isSignIn ? signInBody() : signUpBody()}

      <Pressable className="mt-1 mb-5 ">
        {isSignIn ? (
          <View>
            <Pressable
              onPress={() => {
                setIsSignIn(false);
              }}
            >
              <Text className="justify-end text-right">
                Not a member yet? Join Now
              </Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Pressable
              onPress={() => {
                setIsSignIn(true);
              }}
            >
              <Text className="justify-end text-right">
                Already a member? Sign In
              </Text>
            </Pressable>
          </View>
        )}
      </Pressable>
    </View>
  );
}
