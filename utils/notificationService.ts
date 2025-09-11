import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as BackgroundFetch from "expo-background-fetch";
import Constants from "expo-constants";
import * as TaskManager from "expo-task-manager";
import { getAllReminders } from "./db";

const TASK_NAME = "MEDICINE_REMINDER_TASK";

// ✅ Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, // ✅ replaced shouldShowAlert
    shouldShowList: true, // ✅ new required field
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ✅ Register and get Expo Push Token
export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert("Must use physical device for Push Notifications");
    return;
  }

  // Create Android notification channel (needed for Android 13+)
  if (Device.osName === "Android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // Check & request permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token!");
    return;
  }

  // ✅ Get Expo push token (for remote push)
  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

  console.log("Expo push token:", token);
  return token;
}

// ✅ Ask permission separately if you just need local notifications
export async function requestPermissions(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permission for notifications not granted!");
    return false;
  }
  return true;
}

// ✅ Send an immediate local notification
export async function sendNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null, // fires immediately
  });
}

// ✅ Schedule notification after X seconds
export async function scheduleNotification(
  title: string,
  body: string,
  seconds: number
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, // 👈 required
      seconds,
      repeats: false,
    },
  });
}


TaskManager.defineTask(TASK_NAME, async () => {
  try {
    // ✅ Load reminders from SQLite
    const reminders = [] as any

    // ✅ Check if any reminder is due
    const now = new Date();
    for (const r of reminders) {
      const reminderTime = new Date(r.date);
      if (reminderTime <= now && !r.done) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Medicine Reminder 💊",
            body: `${r.medicine} - ${r.dose} (${r.consume})`,
          },
          trigger: null,
        });
      }
    }
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (err) {
    console.error("Background task error:", err);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export async function registerBackgroundTask() {
  await BackgroundFetch.registerTaskAsync(TASK_NAME, {
    minimumInterval: 15 * 60, // every 15 minutes
    stopOnTerminate: false,   // Android: keep running after app is killed
    startOnBoot: true,        // Android: auto-start on device reboot
  });
}