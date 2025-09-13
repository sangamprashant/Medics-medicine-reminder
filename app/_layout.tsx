import { AppDataProvider } from "@/providers/appDataProvider";
import { migrateDbIfNeeded } from "@/utils/db";
import { registerBackgroundTask, registerForPushNotificationsAsync } from "@/utils/notificationService";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    Promise.all([
      registerForPushNotificationsAsync(),
      registerBackgroundTask()
    ])
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
