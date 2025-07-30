import AddButton from '@/components/AddButton';
import CommonWrapper from '@/components/CommonWrapper';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

const reminders = [
  {
    id: '1',
    time: '08:00',
    name: 'Paracetamol',
    dose: '1 Tablet - Before or After meal',
    icon: 'ellipse',
    color: '#FBC02D',
    done: true,
  },
  {
    id: '2',
    time: '08:30',
    name: 'Bisolvon Extra',
    dose: '10 ml - After meal',
    icon: 'water',
    color: '#BA68C8',
    done: false,
  },
  {
    id: '3',
    time: '14:00',
    name: 'Paracetamol',
    dose: '1 Tablet - Before or After meal',
    icon: 'ellipse',
    color: '#FBC02D',
    done: false,
  },
  {
    id: '4',
    time: '20:30',
    name: 'Antihistamin',
    dose: '1 Capsule - After meal',
    icon: 'leaf',
    color: '#66BB6A',
    done: false,
  },
  {
    id: '5',
    time: '08:00',
    name: 'Paracetamol',
    dose: '1 Tablet - Before or After meal',
    icon: 'ellipse',
    color: '#FBC02D',
    done: true,
  },
  {
    id: '6',
    time: '08:00',
    name: 'Paracetamol',
    dose: '1 Tablet - Before or After meal',
    icon: 'ellipse',
    color: '#FBC02D',
    done: true,
  },
  {
    id: '7',
    time: '08:00',
    name: 'Paracetamol',
    dose: '1 Tablet - Before or After meal',
    icon: 'ellipse',
    color: '#FBC02D',
    done: true,
  },
  {
    id: '1d',
    time: '08:00',
    name: 'Paracetamol',
    dose: '1 Tablet - Before or After meal',
    icon: 'ellipse',
    color: '#FBC02D',
    done: true,
  },
  {
    id: '1dfg',
    time: '08:00',
    name: 'Paracetamol',
    dose: '1 Tablet - Before or After meal',
    icon: 'ellipse',
    color: '#FBC02D',
    done: true,
  },
  {
    id: 'fg1',
    time: '08:00',
    name: 'Paracetamol',
    dose: '1 Tablet - Before or After meal',
    icon: 'ellipse',
    color: '#FBC02D',
    done: true,
  },
  {
    id: 'dfg1',
    time: '08:00',
    name: 'Paracetamol',
    dose: '1 Tablet - Before or After meal',
    icon: 'ellipse',
    color: '#FBC02D',
    done: true,
  },
];

const Home = () => {
  return (
    <CommonWrapper padding={0}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
        <Text style={styles.header}>Hello! 👋</Text>
        <Text style={styles.subheader}>Don’t forget to take your medicine today.</Text>

        <Text style={styles.sectionTitle}>Today’s reminder</Text>
        <ScrollView showsVerticalScrollIndicator={false} >

          {reminders.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardLeft}>
                <Ionicons name={item.icon as any} size={20} color={item.color} style={styles.icon} />
                <View>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.dose}>{item.dose}</Text>
                </View>
              </View>
              <Checkbox
                status={item.done ? 'checked' : 'unchecked'}
                onPress={() => {
                  // setChecked(!checked);
                }}
              />
            </View>
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  time: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    fontSize: 14,
    marginTop: 2,
  },
  dose: {
    fontSize: 12,
    color: '#888',
  },
});
