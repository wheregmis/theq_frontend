import { View, Text } from "react-native";
import userLoginFunction from "../controller/user_controller";
import Header from "../Components/Header";

export default function AdminDashboard() {
  return (
    <View className="flex flex-col items-center justify-center">
      <Header />
    </View>
  );
}
