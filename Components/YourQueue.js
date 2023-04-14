import React from "react";
import { View, ScrollView, Text } from "react-native";
import useFetchOrganizations from "../controller/organization_controller";
import OrganizationInfoCard from "./OrganizationInfoCard";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { organizationsAtom } from "../state/atoms";
import { getCurrentUser } from "../controller/user_controller";

import {
  calculateEstimatedWaitingTimeAndUsersInFront,
  pushLocalNotification,
} from "../controller/notification_controller";

const YourQueueComponent = () => {
  const [organizations, setOrganizations] = useRecoilState(organizationsAtom);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentQueueOrganizationId, setCurrentQueueOrganizationId] =
    React.useState(null);

  const [queueOrganization, setQueueOrganization] = React.useState(null);

  const navigation = useNavigation();
  const handleOrganizationPress = (organizationId) => {
    console.log("Organization Pressed: ", organizationId);
    navigation.navigate("OrganizationScreen", { organizationId });
  };

  function findCurrentQueue() {
    for (let i = 0; i < organizations?.length; i++) {
      const organization = organizations[i];
      if (organization.queues.length > 0) {
        for (let j = 0; j < organization.queues.length; j++) {
          const queue = organization.queues[j];
          if (queue.user == currentUser?._id) {
            setCurrentQueueOrganizationId(organization?._id);
            setQueueOrganization(organization);
          }
        }
      }
    }
  }

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    const averageServiceTime = 3;

    const { estimatedWaitingTime, usersInFront } =
      calculateEstimatedWaitingTimeAndUsersInFront(
        averageServiceTime,
        currentUser?._id,
        queueOrganization
      );

    console.log(estimatedWaitingTime, usersInFront);

    if (usersInFront === 0) {
      pushLocalNotification(
        "You are next in line!",
        "Please proceed to the counter",
        {}
      );
    }

    if (usersInFront === 1) {
      pushLocalNotification(
        "You are next in line after 1 person!",
        "Please be ready to proceed to the counter",
        {}
      );
    }

    fetchCurrentUser();
    findCurrentQueue();
  }, [organizations]);

  return (
    <View>
      {currentQueueOrganizationId ? (
        <OrganizationInfoCard
          organizationId={currentQueueOrganizationId}
          loading={currentQueueOrganizationId == null}
          onPress={() => handleOrganizationPress(currentQueueOrganizationId)}
        ></OrganizationInfoCard>
      ) : (
        <Text>You are not in any queue</Text>
      )}
    </View>
  );
};

export default YourQueueComponent;
