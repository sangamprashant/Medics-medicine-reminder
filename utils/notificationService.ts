import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as BackgroundFetch from "expo-background-fetch";
import Constants from "expo-constants";
import * as TaskManager from "expo-task-manager";
import {
  getAllReminders,
  getRemindersByDate,
  getRemindersByDateWithoutDbPass,
} from "./db";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// ✅ Background Task
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const now = new Date();
    const todayDateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD

    // Read last loaded date from storage
    const lastLoadedDate = await AsyncStorage.getItem("lastReminderDate");

    // ⏭ Skip if today's reminders already loaded
    if (lastLoadedDate === todayDateStr) {
      console.log("⏭ Skipping, today's reminders already scheduled");
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // ✅ New day → load today's reminders
    const reminders = await getRemindersByDateWithoutDbPass(now);

    for (const r of reminders) {
      if (r.done) {
        await scheduleDailyReminders(r);
      }
    }

    // Save today as processed
    await AsyncStorage.setItem("lastReminderDate", todayDateStr);

    console.log("✅ Reminders scheduled for", now.toDateString());
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (err) {
    console.error("❌ Background task error:", err);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export async function registerBackgroundTask() {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
  if (!isRegistered) {
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 15 * 60, // 15 minutes
      stopOnTerminate: false, // Android: keep running
      startOnBoot: true, // Android: auto-start on reboot
    });
  }
}


async function scheduleDailyReminders(r: RawReminder) {
  // Fixed reminder times
  const reminderTimes = [
    { hour: 8, minute: 0 },  // Morning 8:00 AM
    { hour: 12, minute: 0 }, // Noon 12:00 PM
    { hour: 19, minute: 0 }, // Evening 7:00 PM
  ];

  for (const t of reminderTimes) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "💊 Medicine Reminder",
        body: `${r.medicineName} - ${r.dose} (${r.consume})`,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR, // 👈 required
        hour: t.hour,
        minute: t.minute,
        repeats: false, // 🔑 ensures it repeats daily
      },
    });
  }
}