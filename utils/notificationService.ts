import * as Notifications from "expo-notifications";

// Ask permission to send notifications
export async function requestPermissions():boolean {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permission for notifications not granted!");
    return false;
  }
  return true;
}

// Send local notification
export async function sendNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null, // fires immediately
  });
}
