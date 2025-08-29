import { medicineTypes } from "@/initial/medicine-init";
import { _colors } from "@/theme";
import { addMedicine } from "@/utils/db";
import { Picker } from "@react-native-picker/picker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddMedicine = () => {
    const [medicineName, setMedicineName] = useState("");
    const [medicineType, setMedicineType] = useState<MedicineType>("tablet");

    const db = useSQLiteContext();

    const handleSubmit = async () => {
        if (!medicineName.trim()) {
            Alert.alert("Validation", "Please enter a medicine name");
            return;
        }

        const trimName = medicineName.trim().toLowerCase();
        const upperName = trimName.charAt(0).toUpperCase() + trimName.slice(1);

        await addMedicine(db, upperName, medicineType);

        Alert.alert("Success", "Medicine added successfully!");
        setMedicineName("");
        setMedicineType("tablet");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Medicine</Text>

            {/* Medicine Name */}
            <Text style={styles.label}>Medicine Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter medicine name"
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
                        <Picker.Item key={type.value} label={type.label} value={type.value} />
                    ))}
                </Picker>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save Medicine</Text>
            </TouchableOpacity>

        </View>
    );
};

export default AddMedicine;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
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
