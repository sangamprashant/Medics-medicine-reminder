import DateC from "@/components/addreminder/date";
import CommonWrapper from "@/components/CommonWrapper";
import { medicineTypes } from "@/initial/medicine-init";
import { _colors } from "@/theme";
import { addReminderList, getAllMedicines } from "@/utils/db";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

type MedicineType = typeof medicineTypes[number]["value"];

const AddReminder = () => {
  const [time, setTime] = useState(new Date());
  const [allMedicines, setAllMedicines] = useState<Medicine[]>([]);
  const [selectedType, setSelectedType] = useState<MedicineType>("tablet");
  const [selectedMedicine, setSelectedMedicine] = useState<undefined | number>(undefined);
  const [dose, setDose] = useState("1");
  const [frequency, setFrequency] = useState("1");
  const [duration, setDuration] = useState("2");
  const [durationUnit, setDurationUnit] = useState("days");
  const [consume, setConsume] = useState("1")
  const [adding, setAdding] = useState(false)

  const [showCalendar, setShowCalendar] = useState(false)

  const db = useSQLiteContext()

  const getDurationInDays = (duration: number, unit: string) => {
    switch (unit) {
      case "days":
        return duration;
      case "weeks":
        return duration * 7;
      case "months":
        return duration * 30;
      default:
        return duration;
    }
  };

  const expandReminders = (
    startDate: Date,
    duration: number,
    unit: string,
    baseData: Omit<Reminder, "date">
  ) => {
    const totalDays = getDurationInDays(duration, unit);
    const reminders: Reminder[] = [];

    for (let i = 0; i < totalDays; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);

      reminders.push({
        ...baseData,
        date: nextDate,
      });
    }

    return reminders;
  };


  const saveReminder = async () => {
    if (!selectedMedicine) {
      ToastAndroid.show("Please select a medicine.", ToastAndroid.SHORT);
      return;
    }
    if (!dose || isNaN(Number(dose)) || Number(dose) <= 0) {
      ToastAndroid.show("Please enter a valid dose.", ToastAndroid.SHORT);
      return;
    }
    if (!frequency || isNaN(Number(frequency)) || ![1, 2, 3].includes(Number(frequency))) {
      ToastAndroid.show("Please select a valid frequency (1, 2, or 3).", ToastAndroid.SHORT);
      return;
    }
    if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) {
      ToastAndroid.show("Please enter a valid duration.", ToastAndroid.SHORT);
      return;
    }
    if (!durationUnit) {
      ToastAndroid.show("Please select a duration unit.", ToastAndroid.SHORT);
      return;
    }
    if (!consume || !["1", "2"].includes(consume)) {
      ToastAndroid.show("Please select when to consume the medicine.", ToastAndroid.SHORT);
      return;
    }

    const baseData: Partial<Reminder> = {
      date: time,
      medicine: selectedMedicine as number,
      dose,
      frequency,
      consume: consume === "1" ? "Before meal" : "After meal",
    };

    const allReminders = expandReminders(time, Number(duration), durationUnit, baseData as Reminder);

    try {
      setAdding(true)
      await addReminderList(db, allReminders)
      setSelectedMedicine(undefined);
      setDose("1");
      setFrequency("1");
      ToastAndroid.show("Reminders added successfully.", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error saving reminders:", error);
      ToastAndroid.show("Failed to add reminders. Please try again.", ToastAndroid.SHORT);
    } finally {
      setAdding(false)
    }
  }

  // Fetch all medicines once or from DB
  useEffect(() => {
    const fetchMedicines = async () => {
      const meds = await getAllMedicines(db);
      setAllMedicines(meds);
    };
    fetchMedicines();
  }, [db]);

  // UseMemo to filter medicines by type
  const filteredMedicines = useMemo(() => {
    return allMedicines.filter((med) => med.type === selectedType);
  }, [allMedicines, selectedType]);

  return (
    <CommonWrapper padding={0}>
      <Text style={styles.heading}>New Reminder</Text>
      <KeyboardAvoidingView style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 0}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Date & Time Picker */}
          <Text style={styles.subheading}>Select Date & Time</Text>

          <View style={{ position: "relative" }}>
            <View style={styles.pickerWrapper}>
              <TouchableOpacity onPress={() => { setShowCalendar(true) }} style={{ flex: 1 }}>
                <Text style={{ padding: 15 }}>
                  {new Date(time).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
                <AntDesign name="calendar" size={20} style={{ position: "absolute", right: 10, top: 15 }} />
              </TouchableOpacity>
            </View>
            <DateC time={time} setTime={setTime} showCalendar={showCalendar} setShowCalendar={setShowCalendar} />
          </View>

          {/* Medicine Type */}
          <Text style={styles.subheading}>Medicine Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedType}
              onValueChange={val => setSelectedType(val as MedicineType)}
            >
              {medicineTypes.map(type => (
                <Picker.Item key={type.value} label={type.label} value={type.value} />
              ))}
            </Picker>
          </View>

          {/* Medicine Name */}
          <Text style={styles.subheading}>Medicine</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedMedicine}
              onValueChange={val => setSelectedMedicine(val)}
            >
              <Picker.Item label="-- Select medicine --" value="" enabled={false} />
              {filteredMedicines.map(med => (
                <Picker.Item key={med.id} label={med.name} value={med.id} />
              ))}
            </Picker>
          </View>

          {/* Dose */}
          <TextInput
            label="Dose"
            value={dose}
            onChangeText={setDose}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />

          {/* Before/After Meal */}
          <Text style={styles.subheading}>Consumed when?</Text>
          <RadioButton.Group onValueChange={setConsume} value={consume}>
            <View style={styles.row}>
              <RadioButton.Item label="Before meal" value="1" color={_colors["primary"]} />
              <RadioButton.Item label="After meal" value="2" color={_colors["primary"]} />
            </View>
          </RadioButton.Group>

          {/* Frequency */}
          <Text style={styles.subheading}>Frequency (times/day)</Text>
          <RadioButton.Group onValueChange={setFrequency} value={frequency}>
            <View style={styles.row}>
              <RadioButton.Item label="1" value="1" color={_colors["primary"]} />
              <RadioButton.Item label="2" value="2" color={_colors["primary"]} />
              <RadioButton.Item label="3" value="3" color={_colors["primary"]} />
            </View>
          </RadioButton.Group>

          {/* Duration */}
          <Text style={styles.subheading}>Duration</Text>
          <View style={styles.row}>
            <TextInput
              label="Duration"
              value={duration}
              onChangeText={setDuration}
              style={[styles.input, { flex: 1, marginRight: 10, width: 50, marginTop: 10 }]}
              mode="outlined"
              keyboardType="numeric"
            />
            <View style={{ flex: 1, borderColor: "#bbb", borderWidth: 1, borderRadius: 8, backgroundColor: "#fff", overflow: "hidden" }}>
              <RNPickerSelect
                value={durationUnit}
                onValueChange={setDurationUnit}
                items={[
                  { label: "Days", value: "days" },
                  { label: "Weeks", value: "weeks" },
                  { label: "Months", value: "months" },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: "-- Select Duration --", value: null }}
              />
            </View>
          </View>

        </ScrollView>
        <Button mode="contained" onPress={saveReminder} style={styles.button} loading={adding} disabled={adding}>
          Save Reminder
        </Button>
      </KeyboardAvoidingView>
    </CommonWrapper >
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingBottom: 40, flexGrow: 1 },
  heading: { fontSize: 24, fontWeight: "bold", margin: 20, marginTop: 20, color: _colors.primary },
  subheading: { fontSize: 16, marginBottom: 5, fontWeight: "500" },
  input: { marginBottom: 15 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  button: { margin: 20, padding: 5, backgroundColor: _colors.primary },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderColor: "#ccc",
    color: "black",
    backgroundColor: "white",
    margin: 0
  },
  inputAndroid: {
    borderColor: "#ccc",
    color: "black",
    backgroundColor: "white",
    margin: 0
  },
});

export default AddReminder;
