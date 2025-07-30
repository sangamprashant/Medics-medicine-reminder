import { _colors } from '@/theme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const AddButton = () => {
    const router = useRouter()
    const handlePress = () => {
        router.push("/(page)/add")
    }
    return (
        <TouchableOpacity style={styles.fab} onPress={handlePress}>
            <Ionicons name="add" size={24} color="#fff" />
            <Text style={styles.label}>Add Reminder</Text>
        </TouchableOpacity>
    )
}

export default AddButton

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: _colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6, // Android shadow
    },
    label: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 8,
        fontSize: 16,
    },
})
