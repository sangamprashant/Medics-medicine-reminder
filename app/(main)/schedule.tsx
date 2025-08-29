import AddButton from '@/components/AddButton';
import CommonWrapper from '@/components/CommonWrapper';
import { _colors } from '@/theme';
import { formatDate, formatDateYYYMMDD } from '@/utils/date';
import { getRemindersByDate } from '@/utils/db';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reminders, setReminders] = useState<RawReminder[]>([])
  const db = useSQLiteContext()

  useEffect(() => {
    const fetcData = async () => {
      const reminders: RawReminder[] = await getRemindersByDate(db, selectedDate);
      setReminders(reminders)
      console.log("Reminders for selected date:", reminders);
    }
    fetcData()
  }, [db, selectedDate])

  return (
    <CommonWrapper padding={0}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
        <Calendar
          onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
          markedDates={{
            [formatDateYYYMMDD(selectedDate)]: {
              selected: true,
              selectedColor: _colors.primary,
            },
          }}
          theme={{
            selectedDayBackgroundColor: _colors.primary,
            todayTextColor: _colors.primary,
            arrowColor: _colors.primary,
          }}
        />
        <Text style={styles.dateTitle}>{formatDate(selectedDate)}</Text>
        {reminders.length === 0 ? (
          <Text style={styles.noReminder}>No reminder.</Text>
        ) : (
          <FlatList
            data={reminders}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.time}>{item.medicineName} - {item.medicineType}</Text>
                <Text style={styles.dosage}>{item.dose}</Text>
              </View>
            )}
          />
        )}
      </View>
      <AddButton />
    </CommonWrapper>
  );
};

const styles = StyleSheet.create({
  dateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  noReminder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dosage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default Schedule;
