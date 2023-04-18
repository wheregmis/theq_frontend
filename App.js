// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screen/LoginScreen";
import Dashboard from "./Screen/DashboardScreen";
import AdminDashboard from "./Screen/AdminDashboard";
import UserProfile from "./Screen/UserProfile";
import OrganizationScreen from "./Screen/OrganizationScreen";
import { RecoilRoot } from "recoil";
import registerForPushNotificationsAsync, {
  calculateEstimatedWaitingTimeAndUsersInFront,
  pushLocalNotification,
} from "./controller/notification_controller";
import RatingScreen from "./Screen/RatingScreen";
import ChatScreen from "./Screen/ChatScreen";

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <RecoilRoot>
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

          <Stack.Screen
            name="RatingScreen"
            component={RatingScreen}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
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
