import React, { useContext } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";

import { Storage } from "expo-storage";
import MyImage from "../Images/tims.png";
import OrganizationInfoCard from "../Components/OrganizationInfoCard";

export default function Dashboard({ route, navigation }) {
  return (
    <SafeAreaView>
      <ScrollView className="w-full">
        <View className="flex flex-col items-center justify-center bg-slate-50 pt-5">
          <View className="flex flex-row px-6 w-full items-center justify-evenly">
            <Text className="text-xl text-center font-bold mb-6 text-slate-900 -ml-2">
              Tim Hortons Queue
            </Text>
          </View>
          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200 " />

          {isUserAdmin ? <AddProject /> : null}

          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200" />

          {/* Create a divider */}
          {/* Create a flat list and map all the project with project card */}

          <OrganizationInfoCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
