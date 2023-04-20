import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import userLoginFunction, {
  getCurrentUser,
} from "../controller/user_controller";
import Header from "../Components/Header";
import { useFetchOrganization } from "../controller/organization_controller";
import { queueRouteURL, userRouteURL } from "../constraints/urls";
import axios from "axios";
import ServeQueueTable from "../Components/ServeQueueTable";

export default function OrganizationDashboard({ route, navigation }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const { organization, loading, error } = useFetchOrganization(
    currentUser?.organization
  );

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user.data);
      } catch (err) {
        alert("Error fetching current user");
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, []);

  async function handleServe() {
    //get the first user in the queue by joinedAt
    const firstUser = organization.queues[0].user;

    // getting the organization id from the queue
    const organizationId = organization.queues[0].organization;

    console.log(firstUser);
    console.log(organizationId);

    // removing the user from the queue by sending a delete request to the backend using axios
    const response = await fetch(
      `${queueRouteURL}/user/${firstUser}/organization/${organizationId}`,
      {
        method: "DELETE",
      }
    );
  }
  return (
    <View className="flex-1 items-center pt-12 justify-start bg-slate-50">
      <Header />
      {organization?.queues?.length > 0 ? (
        organization?.queues?.map((queue) => (
          <ServeQueueTable queue={queue} key={queue._id} />
        ))
      ) : (
        <Text className="text-2xl font-medium text-black">
          No one is in the queue
        </Text>
      )}
      <View>
        <Pressable
          className="h-12 w-40 bg-black rounded-md mx-auto flex flex-row justify-center items-center px-6 mt-4"
          onPress={() => handleServe()}
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Serve</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
