import React from "react";
import { View, ScrollView, Text } from "react-native";
import useFetchOrganizations from "../controller/organization_controller";
import OrganizationInfoCard from "./OrganizationInfoCard";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import {
  currentQueueOrganizationAtom,
  organizationsAtom,
} from "../state/atoms";
import { getCurrentUser } from "../controller/user_controller";

import {
  calculateEstimatedWaitingTimeAndUsersInFront,
  pushLocalNotification,
} from "../controller/notification_controller";

const YourQueueComponent = () => {
  const [organizations, setOrganizations] = useRecoilState(organizationsAtom);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentQueueOrganization, setCurrentQueueOrganization] =
    useRecoilState(currentQueueOrganizationAtom);

  const navigation = useNavigation();
  const handleOrganizationPress = (organizationId) => {
    console.log("Organization Pressed: ", organizationId);
    navigation.navigate("OrganizationScreen", { organizationId });
  };

  const [isNotificationSent, setIsNotificationSent] = React.useState(false);

  const [queueDiv, setQueueDiv] = React.useState(false);

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user.data);
      findCurrentQueue();
    };

    function findCurrentQueue() {
      // checking the user's queue and if the user is not in any queue, then set the currentQueueOrganization to null
      const currentQueOrg = organizations?.find(
        (org) =>
          org.queues.find((q) => q.user === currentUser?._id) !== undefined
      );

      if (currentQueOrg === undefined) {
        setCurrentQueueOrganization(null);
      } else {
        setCurrentQueueOrganization(currentQueOrg);
      }
    }

    const averageServiceTime = 3;

    const { estimatedWaitingTime, usersInFront } =
      calculateEstimatedWaitingTimeAndUsersInFront(
        averageServiceTime,
        currentUser?._id,
        currentQueueOrganization
      );

    if (usersInFront === 0) {
      if (!isNotificationSent) {
        pushLocalNotification(
          "You are next in line!",
          "Please proceed to the counter",
          {}
        );
        setIsNotificationSent(true);
      }
    }

    // if (usersInFront === 1) {
    //   pushLocalNotification(
    //     "You are next in line after 1 person!",
    //     "Please be ready to proceed to the counter",
    //     {}
    //   );
    // }

    fetchCurrentUser();

    if (currentQueueOrganization != undefined) {
      setQueueDiv(true);
    } else {
      setQueueDiv(false);
    }
  }, [organizations]);

  return (
    <View>
      {queueDiv ? (
        <OrganizationInfoCard
          organizationId={currentQueueOrganization?._id}
          loading={currentQueueOrganization?._id == null}
          onPress={() => handleOrganizationPress(currentQueueOrganization?._id)}
        ></OrganizationInfoCard>
      ) : (
        <Text>You are not in any queue</Text>
      )}
    </View>
  );
};

export default YourQueueComponent;
