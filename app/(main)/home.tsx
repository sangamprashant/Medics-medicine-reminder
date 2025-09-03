import AddButton from '@/components/AddButton';
import CommonWrapper from '@/components/CommonWrapper';
import ReminderItems from '@/components/home/ReminderItems';
import { useAppData } from '@/providers/appDataProvider';
import { _colors } from '@/theme';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

const Home = () => {
  const { reminderList, todaysLoading } = useAppData()
  return (
    <CommonWrapper padding={0}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
        <Text style={styles.header}>Hello! 👋</Text>
        <Text style={styles.subheader}>Don’t forget to take your medicine today.</Text>

        <Text style={styles.sectionTitle}>Today’s reminder</Text>
        {todaysLoading ? (
          <>
            <ActivityIndicator size="large" color={_colors.primary} style={{ marginTop: 40 }} />
          </>
        ) : (
          <>
            {reminderList.length === 0 ? (
              <View style={{ alignItems: 'center', flex: 1, backgroundColor: "#eee", justifyContent: "center" }}>
                <Text style={{ color: '#777'}}>No reminders for today. Enjoy your day!</Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                {reminderList.map((item) => (
                  <ReminderItems key={item.id} {...item} />
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
});
