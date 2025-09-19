import { _colors } from '@/theme';
import { updateReminderStatus } from '@/utils/db';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

type IconRenderTuple = [React.ComponentType<any>, string, string];

interface data { i: RawReminder, togleShow?: boolean }

const ReminderItems = (data: data) => {
    const db = useSQLiteContext();
    const [item, setItem] = React.useState<RawReminder>(data.i);

    const dateObj = new Date(item.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();
    const currentYear = new Date().getFullYear();
    const formattedDate = `${day} ${month}${year !== currentYear ? `, ${year}` : ""}`;

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
                return [Ionicons, "medkit", "#607d8b"];
        }
    };

    const [IconComponent, iconName, iconColor] = getIconByType(item.medicineType);

    const handleCheckBoxYes = async () => {
        const r: boolean = await updateReminderStatus(db, item.id, true);
        if (r) {
            setItem({ ...item, done: 1 });
        }
    };

    return (
        <View key={item.id} style={styles.card}>
            {/* Left: Medicine Icon */}
            <View style={styles.iconWrapper}>
                <IconComponent name={iconName} size={28} color={iconColor} />
            </View>

            {/* Middle: Info */}
            <View style={styles.infoWrapper}>
                <View style={styles.headerRow}>
                    <Text style={styles.medicineName}>{item.medicineName}</Text>
                    {!data.togleShow && <View style={[styles.badge, { backgroundColor: item.done ? "#e8f5e9" : "#fff3e0" }]}>
                        <Text style={{ fontSize: 11, color: item.done ? "#2e7d32" : "#ef6c00" }}>
                            {item.done ? "Done" : "Pending"}
                        </Text>
                    </View>}
                </View>

                <Text style={styles.meta}>
                    {item.dose} {item.medicineType} • {item.frequency}x/day
                </Text>

                <View style={styles.row}>
                    <Ionicons name="restaurant" size={14} color="#00796b" style={{ marginRight: 4 }} />
                    <Text style={styles.consume}>{item.consume}</Text>
                </View>

                <View style={styles.row}>
                    <Ionicons name="calendar-outline" size={14} color="#555" style={{ marginRight: 4 }} />
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>

            {/* Right: Checkbox */}
            {data.togleShow && <Checkbox
                status={item.done ? "checked" : "unchecked"}
                onPress={handleCheckBoxYes}
                color={_colors.primary}
            />}
        </View>
    );
};

export default ReminderItems;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 14,
        marginVertical: 8,
        borderRadius: 12,
        elevation: 3,
        flexDirection: "row",
        alignItems: "flex-start",
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    iconWrapper: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#f1f1f1",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    infoWrapper: {
        flex: 1,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    medicineName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        flexShrink: 1,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    meta: {
        fontSize: 13,
        color: "#666",
        marginTop: 2,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    consume: {
        fontSize: 12,
        color: "#00796b",
    },
    date: {
        fontSize: 12,
        color: "#999",
    },
});
