import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import userLoginFunction, {
  getCurrentUser,
} from "../controller/user_controller";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { midJourneyImageUrl } from "../constraints/urls";

export default function UserP({ route, navigation }) {
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, []);
  console.log(currentUser);

  return (
    <View style={styles.container}>
      <View
        className="bg-white h-12 mt-12 mb-12 shadow-md w-60 items-center justify-center rounded-md"
        style={styles.topView}
      >
        <View></View>
        <Text className="text-1xl font-bold text-gray-500">The Q </Text>
      </View>
      <Image
        source={{
          uri: currentUser?.image,
        }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{currentUser?.name}</Text>
      <Text style={styles.email}>{currentUser?.email}</Text>
      <QRCode
        style={{ marginVertical: 10 }}
        value={JSON.stringify({
          user: currentUser?._id,
        })}
        size={200}
        backgroundColor="white"
        color="black"
        logoSize={50}
        logoBackgroundColor="transparent"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topView: {
    position: "absolute",
    top: 0,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: "#8B0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signOutButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
