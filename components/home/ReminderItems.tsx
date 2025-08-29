import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

const ReminderItems = (item: RawReminder) => {
    // Convert string to Date
    const dateObj = new Date(item.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const currentYear = new Date().getFullYear();

    return (
        <View key={item.id} style={styles.card}>
            <View style={styles.cardLeft}>
                <Ionicons name="add-circle" size={24} style={styles.icon} />
                <View>
                    <Text style={styles.time}>{day + " " + month + (year === currentYear ? "" : ", " + year)}</Text>
                    <Text style={styles.name}>{item.medicineName}</Text>
                    <Text style={styles.dose}>{item.dose}</Text>
                </View>
            </View>
            <Checkbox
                status={item.done ? 'checked' : 'unchecked'}
                onPress={() => {
                    
                }}
            />
        </View>
    );
};

export default ReminderItems

const styles = StyleSheet.create({
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
})