import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { useFetchOrganization } from "../controller/organization_controller";
import { organizationsAtom } from "../state/atoms";
import { useRecoilState } from "recoil";

const OrganizationInfoCard = ({ organizationId, loading, onPress }) => {
  const [organizations, setOrganizations] = useRecoilState(organizationsAtom);

  const organization = organizations.find(
    (organization) => organization._id === organizationId
  );

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <Pressable onPress={onPress}>
      <View className="m-5  bg-white rounded-lg shadow-sm">
        <View className="border-1 p-5  shadow-xl w-80 rounded-xl mb-6">
          {/* Header for Project List */}
          <View className="flex flex-row px-3 mt-3 rounded-md mb-12">
            <ShimmerPlaceholder visible={!loading}>
              <Image
                source={{
                  uri: organization?.image,
                }}
                className="rounded-xl mx-auto h-20 w-20"
              />
            </ShimmerPlaceholder>
          </View>
          <View className="flex flex-row px-3 mt-3">
            <ShimmerPlaceholder visible={!loading}>
              <Text className=" w-full text-5md font-bold  text-left">
                {organization?.name}
              </Text>
            </ShimmerPlaceholder>
          </View>
          <View className="flex flex-row items-center justify-center px-3 mt-1">
            <ShimmerPlaceholder visible={!loading}>
              <Text className="w-full  text-5md text-gray-500 font-bold mb-2 ">
                {organization?.address}
              </Text>
            </ShimmerPlaceholder>
          </View>
          <View className="flex flex-row items-center justify-center h-11 rounded-md px-3 mt-1 border-2 w-40 mx-auto">
            <ShimmerPlaceholder visible={!loading}>
              <Text className="text-5md text-gray-500 font-bold">
                {organization.queues ? organization?.queues.length : 0}
              </Text>
            </ShimmerPlaceholder>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default OrganizationInfoCard;
