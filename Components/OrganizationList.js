import React from "react";
import { View, ScrollView, Text } from "react-native";
import useFetchOrganizations from "../controller/organization_controller";
import OrganizationInfoCard from "./OrganizationInfoCard";
import { useNavigation } from "@react-navigation/native";

const OrganizationList = () => {
  const { organizations, loading, error } = useFetchOrganizations();
  const navigation = useNavigation();
  const handleOrganizationPress = (organizationId) => {
    console.log("Organization Pressed: ", organizationId);
    navigation.navigate("OrganizationScreen", { organizationId });
  };

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal>
      {organizations?.map((organization) => (
        <OrganizationInfoCard
          key={organization._id}
          organization={organization}
          loading={organization == null}
          onPress={() => handleOrganizationPress(organization._id)}
        />
      ))}
    </ScrollView>
  );
};

export default OrganizationList;
