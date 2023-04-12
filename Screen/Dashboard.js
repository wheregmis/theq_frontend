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
import AddProject from "../Components/AddProject";
import ProjectCard from "../Components/ProjectCard";
import { projectRouteURL } from "../constraints/urls";
import ProjectContext, { fetchProjects } from "../State/ProjectContext.js";
import { Storage } from "expo-storage";
import { StackActions } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

export default function Dashboard({ route, navigation }) {
  const { projects, setProjects } = useContext(ProjectContext);
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
            <Text className="text-2xl text-center font-bold mb-6 text-slate-900 -ml-2">
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

          <View>
            {/* Header for Project List */}
            <View className="flex flex-row px-3 mt-3">
            <Image></Image>
 
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

          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200" />

          {/* Creating a view to show filters */}
          <View className="flex flex-row items-center justify-center px-3">
            <Text className="w-1/3 text-sm font-bold mb-6 text-slate-900">
              Filter
            </Text>
            <View className="m-1 w-2/3 z-50">
              <Picker
                selectedValue={filter}
                onValueChange={(itemValue, itemIndex) => {
                  setFilter(itemValue);
                  if (itemValue === "All") {
                    setFilteredProjects(projects);
                  } else {
                    setFilteredProjects(
                      projects.filter((project) => project.status === itemValue)
                    );
                  }
                }}
              >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Pending" value="Pending" />
                <Picker.Item label="In Progress" value="In Progress" />
                <Picker.Item label="Completed" value="Completed" />
              </Picker>
            </View>
          </View>

          <View className="flex row items-center justify-end">
            <Pressable
              className="rounded-md flex flex-row justify-end items-end"
              onPress={() => {
                setFilteredProjects(
                  isSortInverse
                    ? filteredProjects.sort((a, b) => a.cost - b.cost)
                    : filteredProjects.sort((a, b) => b.cost - a.cost)
                );
                setIsSortInverse(!isSortInverse);
                console.log(filteredProjects);
              }}
            >
              <Text className="text-blue-400 text-base font-medium">
                Sort By Price
              </Text>
            </Pressable>
          </View>

          {/* Create a divider */}
          <View className="w-full h-1 bg-slate-200 mt-2" />

          {/* // map projects to project card */}
          {filteredProjects.map((project) => (
            <ProjectCard
              projectId={project._id}
              navigation={navigation}
              key={project._id}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
