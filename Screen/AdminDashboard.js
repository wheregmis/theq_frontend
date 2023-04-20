import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React from "react";
import userLoginFunction from "../controller/user_controller";
import Header from "../Components/Header";
import { organizationRouteURL } from "../constraints/urls";
import axios from "axios";

export default function LoginScreen({ route, navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [organizationName, setOrganizationName] = React.useState("");
  const [organizationAddress, setOrganizationAddress] = React.useState("");
  const [organizationDescription, setOrganizationDescription] =
    React.useState("");

  const [organizationWebsite, setOrganizationWebsite] = React.useState("");
  const [organizationLatitude, setOrganizationLatitude] = React.useState("");
  const [organizationLongitude, setOrganizationLongitude] = React.useState("");
  const [loggedIn, currentUserData, error, login, logout] = userLoginFunction();
  const [loading, setLoading] = React.useState(false);

  async function handleAddOrganization() {
    try {
      setLoading(true);
      const response = await axios.post(`${organizationRouteURL}`, {
        email: email,
        password: password,
        organizationName: organizationName,
        organizationAddress: organizationAddress,
        organizationDescription: organizationDescription,
        organizationWebsite: organizationWebsite,
        organizationLatitude: organizationLatitude,
        organizationLongitude: organizationLongitude,
      });

      if (response.status == 200) {
        alert("Organization Added Successfully");
        setLoading(false);
        setEmail("");
        setPassword("");
        setOrganizationName("");
        setOrganizationAddress("");
        setOrganizationDescription("");
        setOrganizationWebsite("");
        setOrganizationLatitude("");
        setOrganizationLongitude("");
      } else {
        alert("Error Adding Organization");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ScrollView>
      <View className="flex-1 items-center pt-12 justify-start bg-slate-50">
        <Header />
        <View className="p-8 mt-12 w-full max-w-sm">
          <Text className="text-2xl font-bold mb-6 text-slate-900">
            Add Organization
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

          <Text className="mb-1">Organization Name</Text>
          <TextInput
            className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
            placeholderTextColor="#000"
            placeholder="Enter Organization Name"
            value={organizationName}
            onChangeText={(text) => setOrganizationName(text)}
          />

          <Text className="mb-1">Organization Address</Text>
          <TextInput
            className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
            placeholderTextColor="#000"
            placeholder="Enter Organization Address"
            value={organizationAddress}
            onChangeText={(text) => setOrganizationAddress(text)}
          />

          <Text className="mb-1">Organization Description</Text>
          <TextInput
            className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
            placeholderTextColor="#000"
            placeholder="Enter Organization Description"
            value={organizationDescription}
            onChangeText={(text) => setOrganizationDescription(text)}
          />

          <Text className="mb-1">Organization Website</Text>
          <TextInput
            className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
            placeholderTextColor="#000"
            placeholder="Enter Organization Website"
            value={organizationWebsite}
            onChangeText={(text) => setOrganizationWebsite(text)}
          />

          <Text className="mb-1">Organization Latitude</Text>
          <TextInput
            className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
            placeholderTextColor="#000"
            placeholder="Enter Organization Latitude"
            value={organizationLatitude}
            onChangeText={(text) => setOrganizationLatitude(text)}
          />

          <Text className="mb-1">Organization Longitude</Text>
          <TextInput
            className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
            placeholderTextColor="#000"
            placeholder="Enter Organization Longitude"
            value={organizationLongitude}
            onChangeText={(text) => setOrganizationLongitude(text)}
          />

          <Pressable
            className="h-12 w-60 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
            onPress={() => handleAddOrganization()}
          >
            <View className="flex-1 flex items-center">
              <Text className="text-white text-base font-medium">
                Add Organization
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
