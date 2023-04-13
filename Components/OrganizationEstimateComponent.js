import { TextInput, View, Text } from "react-native";

export default function OrganizationEstimateComponent({
  estimatedWaitingTime,
}) {
  return (
    <View className="bg-white w-full rounded-xl mb-12 p-4">
      <Text className="text-md3 font-bold mb-6 text-slate-900 text-center">
        Estimates and Other Information
      </Text>

      <Text className="mb-1">Estimated waiting time</Text>
      <TextInput
        className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
        placeholderTextColor="#000"
        value={estimatedWaitingTime + " Minutes"}
      />
      {/* <Text className="mb-1">Estimated waiting time</Text>
      <TextInput
        className="w-full bg-white border border-slate-200 rounded-md h-12 px-4"
        placeholderTextColor="#000"
        placeholder="Placeholder"
      /> */}
    </View>
  );
}
