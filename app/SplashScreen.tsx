// SplashScreen.tsx
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1b9a8f",
      }}
    >
      <Image
        source={require("@/assets/images/logo.png")} 
        style={{ width: 120, height: 120, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>
        Medics.
      </Text>
    </View>
  );
}
