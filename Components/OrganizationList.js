import React from "react";
import { View, ScrollView, Text } from "react-native";
import useFetchOrganizations from "../controller/organization_controller";
import OrganizationInfoCard from "./OrganizationInfoCard";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { searchFilterAtom } from "../state/atoms";

const OrganizationList = () => {
  const { organizations, loading, error } = useFetchOrganizations();
  const [searchFilter, setSearchFilter] = useRecoilState(searchFilterAtom);
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

  const filteredOrganizations = organizations
    ? organizations.filter((organization) =>
        organization.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
    : [];

  return (
    <ScrollView horizontal>
      {filteredOrganizations.length > 0 ? (
        filteredOrganizations.map((organization) => (
          <OrganizationInfoCard
            key={organization._id}
            organizationId={organization._id}
            loading={organization == null}
            onPress={() => handleOrganizationPress(organization._id)}
          />
        ))
      ) : (
        <Text>No Organization Found</Text>
      )}
    </ScrollView>
  );
};

export default OrganizationList;
