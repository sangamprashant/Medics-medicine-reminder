// reminderService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as BackgroundTask from "expo-background-task";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { ToastAndroid } from "react-native";
import { getRemindersByDateWithoutDbPass } from "./db";

const TASK_NAME = "MEDICINE_REMINDER_TASK";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // still needed for backward compat
    shouldShowBanner: true, // iOS banner
    shouldShowList: true, // iOS notification list
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ✅ Register for push notifications
export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    ToastAndroid.show(
      "Must use physical device for Push Notifications",
      ToastAndroid.LONG
    );
    return;
  }

  // Android notification channel
  if (Device.osName === "Android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    ToastAndroid.show(
      "Permission for notifications not granted!",
      ToastAndroid.LONG
    );
    return;
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  return token;
}

// ✅ Schedules notifications for a reminder at fixed times
async function scheduleDailyReminders(reminder: RawReminder) {
  const reminderTimes = [
    { hour: 8, minute: 0 }, // Morning
    { hour: 12, minute: 0 }, // Noon
    { hour: 19, minute: 0 }, // Evening
  ];

  for (const t of reminderTimes) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "💊 Medicine Reminder",
        body: `${reminder.medicineName} - ${reminder.dose} (${reminder.consume})`,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: t.hour,
        minute: t.minute,
        repeats: false,
      },
    });
  }
}

// ✅ Background task definition
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const now = new Date();
    const todayDateStr = now.toISOString().split("T")[0];

    const lastLoadedDate = await AsyncStorage.getItem("lastReminderDate");
    if (lastLoadedDate === todayDateStr) {
      console.log("⏭ Already scheduled for today");
      return BackgroundTask.BackgroundTaskResult.Failed;
    }

    const reminders = await getRemindersByDateWithoutDbPass(now);
    for (const r of reminders) {
      if (!r.done) {
        await scheduleDailyReminders(r);
      }
    }

    await AsyncStorage.setItem("lastReminderDate", todayDateStr);
    console.log("✅ Scheduled reminders for", todayDateStr);

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (err) {
    console.error("❌ Background task error:", err);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

// ✅ Register background task
export async function registerBackgroundTask() {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
  if (!isRegistered) {
    await BackgroundTask.registerTaskAsync(TASK_NAME, {
      minimumInterval: 24 * 60 * 60, // run once per day
    });
  }
}
