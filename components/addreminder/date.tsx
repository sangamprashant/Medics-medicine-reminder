import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

interface CalendarPickerProps {
    time: Date;
    setTime: (date: Date) => void;
    showCalendar: boolean;
    setShowCalendar: (show: boolean) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
    time,
    setTime,
    showCalendar,
    setShowCalendar,
}) => {
    if (!showCalendar) return null;

    const handleDayPress = (day: DateData) => {
        const selectedDate = new Date(day.dateString);
        setTime(selectedDate);
        setShowCalendar(false);
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.calendarContainer}>
                <Calendar
                    current={time.toISOString().split("T")[0]}
                    onDayPress={handleDayPress}
                    markedDates={{
                        [time.toISOString().split("T")[0]]: { selected: true, selectedColor: "#4CAF50" },
                    }}
                    minDate={new Date().toISOString().split("T")[0]}
                />
            </View>
        </View>
    );
};

export default CalendarPicker;


const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
    calendarContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: .5, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});
