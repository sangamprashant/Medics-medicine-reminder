import { AppDataProvider } from "@/providers/appDataProvider";
import { _colors } from "@/theme";
import { migrateDbIfNeeded } from "@/utils/db";
import { registerBackgroundTask, registerForPushNotificationsAsync } from "@/utils/notificationService";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { Appearance, StatusBar } from "react-native";

export default function RootLayout() {
  useEffect(() => {
    Promise.all([
      registerForPushNotificationsAsync(),
      registerBackgroundTask(),
      Appearance.setColorScheme("light")
    ])
  }, []);
  return (
    <SQLiteProvider databaseName="medicines.db" onInit={migrateDbIfNeeded}>
      <StatusBar barStyle="dark-content" backgroundColor={_colors.primary} />
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
