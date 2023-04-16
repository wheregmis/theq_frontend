import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Pressable,TouchableOpacity } from "react-native";

import OrganizationInfoCard from "../Components/OrganizationInfoCard";
import { useFetchOrganization } from "../controller/organization_controller";
import OrganizationEstimateComponent from "../Components/OrganizationEstimateComponent";
import {
  StarIcon,
  ChatBubbleBottomCenterTextIcon,
} from "react-native-heroicons/outline";
import { getCurrentUser } from "../controller/user_controller";
import joinInQueue from "../controller/queue.controller";
import { organizationsAtom } from "../state/atoms";
import { useRecoilState } from "recoil";

import {
  calculateEstimatedWaitingTimeAndUsersInFront,
  pushLocalNotification,
} from "../controller/notification_controller";

export default function OrganizationScreen({ route, navigation }) {
  const { organizationId } = route.params;

  const [organizations, setOrganizations] = useRecoilState(organizationsAtom);

  const organization = organizations.find((org) => org._id === organizationId);

  const [currentUser, setCurrentUser] = React.useState(null);
  const [queueData, joinQueueLoading, joinQueueError, joinQueue] =
    joinInQueue();

  const [estimatedWaitingTime, setEstimatedWaitingTime] = useState(0);
  const [peopleInFront, setPeopleInFront] = useState(0);

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

  React.useEffect(() => {
    const averageServiceTime = 3;

    const { estimatedWaitingTime, usersInFront } =
      calculateEstimatedWaitingTimeAndUsersInFront(
        averageServiceTime,
        currentUser?._id,
        organization
      );

    console.log(estimatedWaitingTime, usersInFront);

    setEstimatedWaitingTime(estimatedWaitingTime);
    setPeopleInFront(usersInFront);

    // if (usersInFront === 0) {
    //   pushLocalNotification(
    //     "You are next in line!",
    //     "Please proceed to the counter",
    //     {}
    //   );
    // }

    // if (usersInFront === 1) {
    //   pushLocalNotification(
    //     "You are next in line after 1 person!",
    //     "Please be ready to proceed to the counter",
    //     {}
    //   );
    // }
  }, [organization]);

  const handleJoinQueue = () => {
    const queueData = {
      organization: organizationId,
      user: currentUser?._id,
    };

    joinQueue(queueData);
  };
  const [showRatingScreen, setShowRatingScreen] = useState(false);

   // Handler function for the onPress event of the StarIcon
  const handleStarIconPress = () => {
    setShowRatingScreen(true);
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
            organizationId={organization._id}
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

          <OrganizationEstimateComponent
            estimatedWaitingTime={estimatedWaitingTime}
            peopleInFront={peopleInFront}
          />

          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200" />

          <View className="flex flex-row px-6 w-full items-center justify-evenly mt-3 mb-5">
            //Todo : check ratingscreen
            <TouchableOpacity onPress={handleStarIconPress}>
              <StarIcon className="h-6 w-6 text-yellow-400" />
            </TouchableOpacity>
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-gray-400" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
