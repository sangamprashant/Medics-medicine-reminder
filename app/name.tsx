import CommonWrapper from "@/components/CommonWrapper";
import { useAppData } from "@/providers/appDataProvider";
import { _colors } from "@/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Medi from "./medi.svg";

const NameScreen = () => {
    const { handleName } = useAppData();
    const [input, setInput] = useState("");
    const router = useRouter()

    const handleSave = async () => {
        if (input.trim().length > 0) {
            await handleName(input.trim());
            router.replace("/(main)/home")
        }
    };

    return (
        <CommonWrapper padding={20}>
            <View style={styles.container}>
                <Medi width={120} height={120} style={{ marginBottom: 20 }} />

                <Text style={styles.title}>Welcome 👋</Text>
                <Text style={styles.subtitle}>Enter your name to get started</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={input}
                    onChangeText={setInput}
                />

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </CommonWrapper>
    );
};

export default NameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: "#555",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: _colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        width: "80%",

    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center"
    },
});
