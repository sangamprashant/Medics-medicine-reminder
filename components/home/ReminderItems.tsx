import { updateReminderStatus } from '@/utils/db';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

type IconRenderTuple = [React.ComponentType<any>, string, string];

const ReminderItems = (i: RawReminder) => {
    const db = useSQLiteContext()
    const [item, setItem] = React.useState<RawReminder>(i)
    const dateObj = new Date(item.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const currentYear = new Date().getFullYear();

    const getIconByType = (type: MedicineType): IconRenderTuple => {
        switch (type) {
            case "tablet":
                return [MaterialCommunityIcons, "pill", "#4caf50"];
            case "ml":
                return [MaterialCommunityIcons, "water", "#2196f3"];
            case "syrup":
                return [MaterialCommunityIcons, "flask", "#ff9800"];
            case "injection":
                return [MaterialCommunityIcons, "needle", "#f44336"];
            case "cream":
                return [MaterialCommunityIcons, "lotion-plus-outline", "#795548"];
            default:
                return [Ionicons, "add-circle", "#607d8b"];
        }
    };

    const [IconComponent, iconName, iconColor] = getIconByType(item.medicineType);

    const handleCheckBoxYes = async () => {
        const r: boolean = await updateReminderStatus(db, item.id, true)
        if (r) {
            setItem({ ...item, done: 1 })
        }
    }

    return (
        <View key={item.id} style={styles.card}>
            <View style={styles.cardLeft}>
                <IconComponent
                    name={iconName}
                    size={24}
                    style={styles.icon}
                    color={iconColor}
                />
                <View>
                    <Text style={styles.time}>{day + " " + month + (year === currentYear ? "" : ", " + year)}</Text>
                    <Text style={styles.name}>{item.medicineName}</Text>
                    <Text style={styles.dose}>{item.dose}</Text>
                </View>
            </View>
            <Checkbox
                status={item.done ? 'checked' : 'unchecked'}
                onPress={() => {
                    handleCheckBoxYes()
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