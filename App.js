// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screen/LoginScreen";
import Dashboard from "./Screen/DashboardScreen";

const Stack = createNativeStackNavigator();

function App() {
  const [projects, setProjects] = React.useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserDashboard"
          component={Dashboard}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
