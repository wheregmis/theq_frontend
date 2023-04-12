import { View, Text } from "react-native";
import userLoginFunction from "../controller/user_controller";
import Header from "../Components/Header";
import SearchComponent from "../Components/SearchComponent";

export default function Dashboard() {
  return (
    <View className="flex flex-col items-center justify-center">
      <Header />
      <SearchComponent />
    </View>
  );
}
