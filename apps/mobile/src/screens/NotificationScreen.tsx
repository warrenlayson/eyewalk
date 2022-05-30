import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

export default function NotificationScreen({}: RootTabScreenProps<'Notification'>) {
  return (
    <View style={styles.container}>
      <Text>Notification</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
