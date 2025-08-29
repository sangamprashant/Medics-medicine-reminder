import AddButton from '@/components/AddButton';
import CommonWrapper from '@/components/CommonWrapper';
import ReminderItems from '@/components/home/ReminderItems';
import { useAppData } from '@/providers/appDataProvider';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Home = () => {
  const { reminderList } = useAppData()
  return (
    <CommonWrapper padding={0}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
        <Text style={styles.header}>Hello! 👋</Text>
        <Text style={styles.subheader}>Don’t forget to take your medicine today.</Text>

        <Text style={styles.sectionTitle}>Today’s reminder</Text>
        <ScrollView showsVerticalScrollIndicator={false} >

          {reminderList.map((item) => (
            <ReminderItems key={item.id} {...item} />
          ))}

        </ScrollView>
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
