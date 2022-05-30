import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { Text, View } from './Themed'

type ButtonProps = {
  title: string
} & React.ComponentPropsWithRef<typeof Pressable>

const Button = ({ title, disabled, ...rest }: ButtonProps) => {
  const colorScheme = useColorScheme()
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
    >
      <View style={styles.button}>
        <Text style={[styles.buttonText, { color: Colors[colorScheme].text }]}>
          {title}
        </Text>
      </View>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 48,
    borderRadius: 10,
    fontWeight: '500',
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
})
