import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import userLoginFunction from "../controller/user_controller";
import { StyleSheet,Image,TouchableOpacity } from "react-native";

export default function UserP({ route, navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, currentUserData, error, login, logout] = userLoginFunction();


  function handleLogin() {
   
    try {
      login(email, password);
      currentUserData && navigation.navigate("UserDashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
 

    <View style={styles.container}>
        <View className="bg-white h-12 mt-12 mb-12 shadow-md w-60 items-center justify-center rounded-md" style={styles.topView}>
        <Text className="text-1xl font-bold text-gray-500">The Q </Text>
      </View>
      <Image source={{ uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} style={styles.profileImage} />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>
      <TouchableOpacity  style={styles.signOutButton}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
    

  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topView: {
        position:'absolute',
        top:0

    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    email: {
      fontSize: 18,
      marginBottom: 20,
    },
    signOutButton: {
        backgroundColor: '#8B0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      signOutButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
      },
  });
