import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
}

function pushLocalNotification(title, body, data) {
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
    },
    trigger: null,
  });
}

function calculateEstimatedWaitingTimeAndUsersInFront(
  averageServiceTime,
  userId,
  organization
) {
  // Sort the queue data by the joinedAt time
  const sortedQueueData = organization?.queues?.sort(
    (a, b) => new Date(a.joinedAt) - new Date(b.joinedAt)
  );

  // Get the user's position in the queue data
  const userPosition =
    sortedQueueData?.findIndex((queue) => queue.user === userId) + 1;

  // console.log(userPosition);
  // Calculate the estimated waiting time using the user's position
  const usersInFront = userPosition == 0 ? 0 : userPosition - 1;

  const estimatedWaitingTime = averageServiceTime * usersInFront;

  return { estimatedWaitingTime, usersInFront };
}

export { calculateEstimatedWaitingTimeAndUsersInFront, pushLocalNotification };
