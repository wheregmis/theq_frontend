import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import userLoginFunction, {
  getCurrentUser,
} from "../controller/user_controller";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import { userRouteURL } from "../constraints/urls";
import CircularProgress from "../Components/CircularProgress";

export default function LoginScreen({ route, navigation }) {
  const [name, setName] = React.useState("");
  const [aliasName, setAliasName] = React.useState("");
  const [aboutYou, setAboutYou] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, currentUserData, error, login, logout] = userLoginFunction();
  const [isSignIn, setIsSignIn] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          if (user?.data.type == "user") {
            navigation.dispatch(StackActions.replace("UserDashboard"));
          }
          if (user?.data.type == "admin") {
            navigation.dispatch(StackActions.replace("AdminDashboard"));
          }
          if (user?.data.type == "organization") {
            navigation.dispatch(StackActions.replace("OrganizationDashboard"));
          }
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
            {!loading ? (
              <Text className="text-white text-base font-medium">Sign In</Text>
            ) : (
              <CircularProgress />
            )}
          </View>
        </Pressable>
      </View>
    );
  };

  const signUpBody = () => {
    return (
      <View className="p-8 mt-2 w-full max-w-sm">
        <Text className="text-2xl font-bold mb-6 text-slate-900">
          Sign Up to
        </Text>

        <Text className="mb-1">Username Or Email</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter Email Address Or Username"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text className="mb-1">Password</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Text className="mb-1">Full Name</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter Your Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text className="mb-1">Alias Name</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter A Name For You To Be Known As"
          value={aliasName}
          onChangeText={(text) => setAliasName(text)}
        />

        <Text className="mb-1">Describe For Generating AI Image</Text>
        <TextInput
          className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
          placeholderTextColor="#000"
          placeholder="Enter Information Describing You"
          value={aboutYou}
          onChangeText={(text) => setAboutYou(text)}
        />

        <Pressable
          className="h-12 w-40 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
          onPress={() => handleSignUp()}
        >
          <View className="flex-1 flex items-center">
            {!loading ? (
              <Text className="text-white text-base font-medium">Sign Up</Text>
            ) : (
              <CircularProgress />
            )}
          </View>
        </Pressable>
      </View>
    );
  };

  async function handleLogin() {
    console.log("handleLogin");
    try {
      setLoading(true);
      await login(email, password);
      setLoading(false);
      console.log("currentUser", currentUserData);
    } catch (err) {
      alert("Invalid email or password");
      console.log(err);
    }
  }

  async function handleSignUp() {
    setLoading(true);
    try {
      const response = await axios.post(userRouteURL, {
        name: name,
        aliasName: aliasName,
        aboutYou: aboutYou,
        email: email,
        password: password,
      });
      console.log(response);

      if (response.status == 200) {
        alert("Sign Up success, Please Login");
        setEmail("");
        setPassword("");
        setName("");
        setAliasName("");
        setAboutYou("");
        setIsSignIn(true);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
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
  if (currentUserData?.data.type == "organization") {
    navigation.dispatch(StackActions.replace("OrganizationDashboard"));
  }

  return (
    <ScrollView>
      <View className="flex-1 items-center pt-12 justify-start ">
        <View className="bg-white h-12 mt-12 mb-12 w-60 items-center justify-center rounded-md">
          <Text className="text-1xl font-bold text-gray-500">The Q </Text>
        </View>
        {isSignIn ? signInBody() : signUpBody()}

        <Pressable className="mt-1">
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
    </ScrollView>
  );
}
