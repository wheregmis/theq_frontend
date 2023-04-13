import React from "react";
import { View, Text, ScrollView, SafeAreaView, Pressable } from "react-native";

import OrganizationInfoCard from "../Components/OrganizationInfoCard";
import { useFetchOrganization } from "../controller/organization_controller";
import OrganizationEstimateComponent from "../Components/OrganizationEstimateComponent";
import {
  StarIcon,
  ChatBubbleBottomCenterTextIcon,
} from "react-native-heroicons/outline";
import { getCurrentUser } from "../controller/user_controller";
import joinInQueue from "../controller/queue.controller";

export default function OrganizationScreen({ route, navigation }) {
  const { organizationId } = route.params;
  const { organization, loading, error } = useFetchOrganization(organizationId);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [queueData, joinQueueLoading, joinQueueError, joinQueue] =
    joinInQueue();

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleJoinQueue = () => {
    const queueData = {
      organization: organizationId,
      user: currentUser?._id,
    };

    joinQueue(queueData);
  };

  return (
    <SafeAreaView className="">
      <ScrollView className="w-full ">
        <View className="flex flex-col items-center justify-center pt-5">
          <View className="flex flex-row px-6 w-full items-center justify-evenly">
            <Text className="text-xl text-center font-bold mb-6 text-slate-900 -ml-2">
              {organization?.name}
            </Text>
          </View>

          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200" />

          <OrganizationInfoCard
            organization={organization}
            loading={organization == null}
          />

          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200" />

          <Pressable
            className="h-12 w-40 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4 mb-4"
            onPress={() => handleJoinQueue()}
          >
            <View className="flex-1 flex items-center">
              <Text className="text-white text-base font-medium">
                Join in Queue
              </Text>
            </View>
          </Pressable>

          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200" />

          <OrganizationEstimateComponent />

          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200" />

          <View className="flex flex-row px-6 w-full items-center justify-evenly mt-3 mb-5">
            <StarIcon className="h-6 w-6 text-yellow-400" />
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-gray-400" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
