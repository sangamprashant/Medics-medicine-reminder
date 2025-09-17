import { medicineTypes } from "@/initial/medicine-init";
import { _colors } from "@/theme";
import { addMedicine } from "@/utils/db";
import { Picker } from "@react-native-picker/picker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";

const AddMedicine = () => {
    const [medicineName, setMedicineName] = useState("");
    const [medicineType, setMedicineType] = useState<MedicineType>("tablet");
    const [loading, setLoading] = useState(false);

    const db = useSQLiteContext();

    const handleSubmit = async () => {
        if (!medicineName.trim()) {
            ToastAndroid.show("Please enter a medicine name.", ToastAndroid.SHORT);
            return;
        }

        setLoading(true);
        const trimName = medicineName.trim().toLowerCase();
        const upperName = trimName.charAt(0).toUpperCase() + trimName.slice(1);

        await addMedicine(db, upperName, medicineType);
        ToastAndroid.show("Medicine added successfully.", ToastAndroid.SHORT);
        setMedicineName("");
        setMedicineType("tablet");
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 0}

        >
            <Text style={{ fontSize: 22, fontWeight: "bold", margin: 16 }}>Add New Medicine</Text>
            <View style={styles.container}>

                {/* Medicine Name */}
                <Text style={styles.label}>Medicine Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter medicine name"
                    placeholderTextColor={_colors.placeholder}
                    value={medicineName}
                    onChangeText={setMedicineName}
                />

                {/* Medicine Type */}
                <Text style={styles.label}>Type</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={medicineType}
                        onValueChange={(itemValue) => setMedicineType(itemValue as MedicineType)}
                    >
                        {medicineTypes.map((type) => (
                            <Picker.Item key={type.value} label={type.label} value={type.value} style={{ color: _colors.black }} />
                        ))}
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                    <Text style={styles.buttonText}>Add New Medicine</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
};

export default AddMedicine;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 15,
        marginBottom: 6,
        color: "#555",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        fontSize: 16,
        color: "#000",
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 20,
        overflow: "hidden",
    },
    button: {
        backgroundColor: _colors.primary,
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    success: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "500",
        color: "green",
        textAlign: "center",
    },
});
