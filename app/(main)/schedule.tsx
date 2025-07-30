import AddButton from '@/components/AddButton';
import CommonWrapper from '@/components/CommonWrapper';
import { _colors } from '@/theme';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

// --- Types ---
type Reminder = {
  time: string;
  medicine: string;
  dosage: string;
};

type RemindersByDate = {
  [date: string]: Reminder[];
};

// --- Dummy Data ---
const dummyReminders: RemindersByDate = {
  '2025-07-31': [
    {
      time: '08:00',
      medicine: 'Paracetamol',
      dosage: '1 Tablet - Before or After meal',
    },
    {
      time: '08:30',
      medicine: 'Bisolvon Extra',
      dosage: '10 ml - After meal',
    },
    {
      time: '14:00',
      medicine: 'Paracetamol',
      dosage: '1 Tablet - Before or After meal',
    },
    {
      time: '08:00',
      medicine: 'Paracetamol',
      dosage: '1 Tablet - Before or After meal',
    },
    {
      time: '08:30',
      medicine: 'Bisolvon Extra',
      dosage: '10 ml - After meal',
    },
    {
      time: '14:00',
      medicine: 'Paracetamol',
      dosage: '1 Tablet - Before or After meal',
    },
    {
      time: '08:00',
      medicine: 'Paracetamol',
      dosage: '1 Tablet - Before or After meal',
    },
    {
      time: '08:30',
      medicine: 'Bisolvon Extra',
      dosage: '10 ml - After meal',
    },
    {
      time: '14:00',
      medicine: 'Paracetamol',
      dosage: '1 Tablet - Before or After meal',
    },
    // More entries...
  ],
  '2022-07-05': [],
  '2022-07-06': [],
};

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2025-07-31');

  const reminders: Reminder[] = dummyReminders[selectedDate] || [];

  return (
    <CommonWrapper padding={0}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
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
                <Text style={styles.time}>{item.time} - {item.medicine}</Text>
                <Text style={styles.dosage}>{item.dosage}</Text>
              </View>
            )}
          />
        )}
      </View>
      <AddButton />
    </CommonWrapper>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
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
