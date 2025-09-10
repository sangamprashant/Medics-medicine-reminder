import { AppDataProvider } from "@/providers/appDataProvider";
import { migrateDbIfNeeded } from "@/utils/db";
import { registerForPushNotificationsAsync, sendNotification } from "@/utils/notificationService";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    sendNotification("Hello 👋", "This is a test notification!",)
  }, []);
  return (
    <SQLiteProvider databaseName="medicines.db" onInit={migrateDbIfNeeded}>
      <AppDataProvider>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        />
      </AppDataProvider>
    </SQLiteProvider>
  )
}
