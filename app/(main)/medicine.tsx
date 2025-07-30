import AddButton from '@/components/AddButton'
import CommonWrapper from '@/components/CommonWrapper'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const medicine = () => {
  return (
    <CommonWrapper padding={0}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
        <Text style={styles.header}>medicine! 👋</Text>
      </View>
      <AddButton />
    </CommonWrapper>
  )
}

export default medicine

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
})