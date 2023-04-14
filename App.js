// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screen/LoginScreen";
import Dashboard from "./Screen/DashboardScreen";
import AdminDashboard from "./Screen/AdminDashboard";
import OrganizationScreen from "./Screen/OrganizationScreen";
import { RecoilRoot } from "recoil";
import registerForPushNotificationsAsync, {
  calculateEstimatedWaitingTimeAndUsersInFront,
  pushLocalNotification,
} from "./controller/notification_controller";

const Stack = createNativeStackNavigator();

function App() {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UserDashboard">
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
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboard}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="OrganizationScreen"
            component={OrganizationScreen}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
