import { View, Text } from "react-native";

export default function Dashboard() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <View className="p-8 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 text-slate-900">
          Dashboard
        </Text>
      </View>
    </View>
  );
}
