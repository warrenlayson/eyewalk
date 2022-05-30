import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Pressable, PressableProps, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { View } from './Themed'

export default function CheckIconButton(props: PressableProps) {
  const colorScheme = useColorScheme()
  return (
    <Pressable
      {...props}
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
    >
      <View>
        <FontAwesome name="check" color={Colors[colorScheme].text} size={20} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({})
