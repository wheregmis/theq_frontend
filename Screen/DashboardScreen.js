import { View, Text } from "react-native";
import Header from "../Components/Header";
import SearchComponent from "../Components/SearchComponent";
import OrganizationList from "../Components/OrganizationList";

export default function Dashboard() {
  return (
    <View className="flex flex-col items-center justify-center">
      <Header />
      <SearchComponent />
      <View>
        <Text className="text-md font-bold text-start mt-5">
          Nearby Organizations
        </Text>
      </View>
      <OrganizationList />
    </View>
  );
}
