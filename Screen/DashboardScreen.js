import React, { useContext } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
// import AddProject from "../Components/AddProject";
// import ProjectCard from "../Components/ProjectCard";
// import { projectRouteURL } from "../constraints/urls";
// import ProjectContext, { fetchProjects } from "../State/ProjectContext.js";
import { Storage } from "expo-storage";
import MyImage from '../Images/tims.png';
import { StackActions } from "@react-navigation/native";
// import { Picker } from "@react-native-picker/picker";

export default function Dashboard({ route, navigation }) {
  // const { projects, setProjects } = useContext(ProjectContext);
  const renderItem = ({ item }) => (
    <ProjectCard projectId={item._id} navigation={navigation} />
  );

  const [isUserAdmin, setIsUserAdmin] = React.useState(false);
  const [filter, setFilter] = React.useState("All");
  const [filteredProjects, setFilteredProjects] = React.useState([]);
  const [isSortInverse, setIsSortInverse] = React.useState(false);

  async function Logout() {
    await Storage.removeItem({ key: "currentUser" });
    navigation.navigate("LoginScreen");
  }

  // React.useEffect(() => {
  //   async function getProjects() {
  //     const projects = await fetchProjects();
  //     setProjects(projects);
  //     setFilteredProjects(projects);
  //   }
  //   async function getCurrentUser() {
  //     const value = JSON.parse(await Storage.getItem({ key: "currentUser" }));
  //     if (value != null) {
  //       console.log(value.type);
  //       value.type.toString() === "admin"
  //         ? setIsUserAdmin(true)
  //         : setIsUserAdmin(false);
  //     } else {
  //       navigation.navigate("LoginScreen");
  //     }
  //   }
  //   getCurrentUser();
  //   getProjects();
  // }, []);

  return (
    <SafeAreaView>
      <ScrollView className="w-full">
        <View className="flex flex-col items-center justify-center bg-slate-50 pt-5">
          <View className="flex flex-row px-6 w-full items-center justify-evenly">
            <Text className="text-xl text-center font-bold mb-6 text-slate-900 -ml-2">
            Tim Hortons Queue
            </Text>
            {/* <View className="-mt-4">
              <Pressable
                className="h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-8 ml-8"
                onPress={async () => {
                  await Logout();
                  navigation.dispatch(StackActions.replace("LoginScreen"));
                }}
              >
                <Text className="text-white text-base font-medium"></Text>
              </Pressable>

              {isUserAdmin ? (
                <Pressable
                  className="h-12 bg-purple-500 rounded-md flex flex-row justify-center items-center px-8 ml-8 mt-2"
                  onPress={() => {
                    navigation.dispatch(StackActions.replace("AdminDashboard"));
                  }}
                >
                  <Text className="text-white text-base font-medium">
                    Admin Panel
                  </Text>
                </Pressable>
              ) : null}
            </View> */}
          </View>
          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200 " />

          {isUserAdmin ? <AddProject /> : null}

          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200" />

          {/* Create a divider */}
          {/* Create a flat list and map all the project with project card */}

          {/* <FlatList
            className="w-full"
            data={projects}
            renderItem={renderItem}
            keyExtractor={(project) => project._id.toString()}
          /> */}

          <View className="border-1 p-5  bg-white shadow-xl w-80 rounded-xl mb-6">
            {/* Header for Project List */}
            <View className="flex flex-row px-3 mt-3 rounded-md mb-12">
            <Image
                source={MyImage}
                className="rounded-xl mx-auto"
                style={{ width: 150, height: 150 }}
              />
 
            </View>
            <View className="flex flex-row px-3 mt-3">
              <Text className=" w-full text-5md font-bold  text-left">
                Tim Hortons
              </Text>
 
            </View>
            <View className="flex flex-row items-center justify-center px-3 mt-1">
              <Text className="w-full  text-5md text-gray-500 font-bold mb-2 ">
               263 Yorkland blvd
              </Text>
 
            </View>
            <View className="flex flex-row items-center justify-center h-11 rounded-md px-3 mt-1 border-2 w-40 mx-auto">
              <Text className="text-5md text-gray-500 font-bold">
               14 in Queue
              </Text>
 
            </View>
          </View>
          <Pressable >
          <View className="bg-black h-12 shadow-md w-40 mb-6 items-center justify-center rounded-md">
        <Text className="text-1xl font-bold text-white">Join in Queue </Text>
        </View>
        </Pressable>
          <View className=" p-5  bg-white shadow-xl w-80 rounded-xl mb-12">
        <Text className="text-md3 font-bold mb-6 text-slate-900 text-center">Estimates and Other Information</Text>

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

          </View>




      </ScrollView>
    </SafeAreaView>
  );
}
