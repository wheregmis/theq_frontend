export default function OrganizationEstimateComponent() {
  return (
    <View className=" p-5  bg-white shadow-xl w-80 rounded-xl mb-12">
      <Text className="text-md3 font-bold mb-6 text-slate-900 text-center">
        Estimates and Other Information
      </Text>

      <Text className="mb-1">Estimated waiting time</Text>
      <TextInput
        className="w-full bg-white border border-slate-200 rounded-md h-12 px-4 mb-4"
        placeholderTextColor="#000"
        placeholder="Placeholder"
      />
      <Text className="mb-1">Estimated waiting time</Text>
      <TextInput
        className="w-full bg-white border border-slate-200 rounded-md h-12 px-4"
        placeholderTextColor="#000"
        placeholder="Placeholder"
      />
    </View>
  );
}
