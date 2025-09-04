// utils/storage.ts
import * as SecureStore from "expo-secure-store";

export async function saveUserName(name: string) {
  try {
    await SecureStore.setItemAsync("user_name", name);
  } catch (e) {
    console.error("Error saving username:", e);
  }
}

export async function getUserName(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync("user_name");
  } catch (e) {
    console.error("Error loading username:", e);
    return null;
  }
}