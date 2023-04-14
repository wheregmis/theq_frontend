import { View, Text, ScrollView } from "react-native";
import Header from "../Components/Header";
import SearchComponent from "../Components/SearchComponent";
import OrganizationList from "../Components/OrganizationList";
import YourQueueComponent from "../Components/YourQueue";

export default function Dashboard() {
  return (
    <ScrollView>
      <View className="flex flex-col items-center justify-center">
        <Header />
        <SearchComponent />
        <View>
          <Text className="text-md font-bold text-start mt-5">
            Nearby Organizations
          </Text>
        </View>
        <OrganizationList />

        <View>
          <Text className="text-md font-bold text-start mt-5">
            Your Current Queue
          </Text>
        </View>
        <YourQueueComponent />
      </View>
    </ScrollView>
  );
}
