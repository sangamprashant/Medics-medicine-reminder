import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, RadioButton, Text, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

const AddReminder = () => {
  const [time, setTime] = useState("08:00");
  const [medicine, setMedicine] = useState("");
  const [dose, setDose] = useState("1");
  const [unit, setUnit] = useState("tablet");
  const [beforeMeal, setBeforeMeal] = useState(true);
  const [afterMeal, setAfterMeal] = useState(true);
  const [frequency, setFrequency] = useState("3");
  const [duration, setDuration] = useState("5");
  const [durationUnit, setDurationUnit] = useState("days");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>New Reminder</Text>

      {/* Time Input */}
      <TextInput
        label="Time"
        value={time}
        onChangeText={setTime}
        style={styles.input}
        mode="outlined"
      />

      {/* Medicine Name */}
      <TextInput
        label="Medicine name"
        value={medicine}
        onChangeText={setMedicine}
        style={styles.input}
        mode="outlined"
      />

      {/* Dose + Unit */}
      <View style={styles.row}>
        <TextInput
          label="Dose"
          value={dose}
          onChangeText={setDose}
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          mode="outlined"
          keyboardType="numeric"
        />
        <View style={{ flex: 1 }}>
          <RNPickerSelect
            value={unit}
            onValueChange={setUnit}
            items={[
              { label: "tablet", value: "tablet" },
              { label: "ml", value: "ml" },
              { label: "capsule", value: "capsule" },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: "Select unit", value: null }}
          />
        </View>
      </View>

      {/* Before/After Meal */}
      <Text style={styles.subheading}>Consumed when?</Text>
      <View style={styles.row}>
        <Checkbox.Item
          label="Before meal"
          status={beforeMeal ? "checked" : "unchecked"}
          onPress={() => setBeforeMeal(!beforeMeal)}
        />
        <Checkbox.Item
          label="After meal"
          status={afterMeal ? "checked" : "unchecked"}
          onPress={() => setAfterMeal(!afterMeal)}
        />
      </View>

      {/* Frequency */}
      <Text style={styles.subheading}>How many times a day?</Text>
      <RadioButton.Group onValueChange={setFrequency} value={frequency}>
        <View style={styles.row}>
          <RadioButton.Item label="1 times" value="1" />
          <RadioButton.Item label="2 times" value="2" />
          <RadioButton.Item label="3 times" value="3" />
        </View>
      </RadioButton.Group>

      {/* Duration */}
      <Text style={styles.subheading}>How long?</Text>
      <View style={styles.row}>
        <TextInput
          label="Duration"
          value={duration}
          onChangeText={setDuration}
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          mode="outlined"
          keyboardType="numeric"
        />
        <View style={{ flex: 1 }}>
          <RNPickerSelect
            value={durationUnit}
            onValueChange={setDurationUnit}
            items={[
              { label: "days", value: "days" },
              { label: "weeks", value: "weeks" },
              { label: "months", value: "months" },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: "Select", value: null }}
          />
        </View>
      </View>

      <Button mode="contained" onPress={() => console.log("Reminder Saved")} style={styles.button}>
        Save reminder
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
  },
});

export default AddReminder;
