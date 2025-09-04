import AddButton from '@/components/AddButton';
import CommonWrapper from '@/components/CommonWrapper';
import ReminderItems from '@/components/home/ReminderItems';
import { useAppData } from '@/providers/appDataProvider';
import { _colors } from '@/theme';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

const Home = () => {
  const { reminderList, todaysLoading } = useAppData();
  let user = { name: "Prashant Srivastv" }; // Placeholder for user data

  return (
    <CommonWrapper padding={0}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>

        {/* Greeting Section */}
        <View style={[]}>
          <Text style={styles.header}>Hello 👋</Text>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.subheader}>Don’t forget to take your medicine today.</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        {/* Reminder Section */}
        <Text style={styles.sectionTitle}>Today’s Reminders</Text>
        {todaysLoading ? (
          <ActivityIndicator size="large" color={_colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            {reminderList.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialIcons name="event-busy" size={50} color="#bbb" />
                <Text style={styles.emptyText}>No reminders for today. Enjoy your day! 🎉</Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {reminderList.map((item) => (
                  <ReminderItems key={item.id} i={item} togleShow />
                ))}
              </ScrollView>
            )}
          </>
        )}
      </View>
      <AddButton />
    </CommonWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: '600',
  },
  userName: {
    fontWeight: 'bold',
    color: _colors.primary,
    textTransform: 'capitalize',
    fontSize: 22,
    marginTop: 2,
    marginBottom: 6,
  },
  subheader: {
    fontSize: 15,
    marginBottom: 10,
    color: '#555',
  },
  dateText: {
    fontSize: 15,
  },
  sectionTitle: {
    color: '#888',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 40,
    backgroundColor: "#f1f1f1",
    borderRadius: 16,
  },
  emptyText: {
    color: '#777',
    marginTop: 12,
    fontSize: 15,
  },
});
