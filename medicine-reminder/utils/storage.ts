import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveUserName(name: string) {
  try {
    await AsyncStorage.setItem("user_name", name);
  } catch (e) {
    console.error("Error saving username:", e);
  }
}

export async function getUserName(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem("user_name");
  } catch (e) {
    console.error("Error loading username:", e);
    return null;
  }
}