import { AppDataProvider } from "@/providers/appDataProvider";
import { migrateDbIfNeeded } from "@/utils/db";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
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
