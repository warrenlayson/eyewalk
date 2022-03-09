import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { Text, View } from './Themed'

type ButtonProps = {
  title: string
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void
  disabled?: boolean | undefined
}

const Button = ({ onPress, title, disabled }: ButtonProps) => {
  return (
    <TouchableHighlight onPress={onPress} disabled={disabled}>
      <View style={styles.button}>
        <Text style={[styles.buttonText]}>{title}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.primary,
    height: 50,
    justifyContent: 'center',
    borderRadius: 4,
    fontWeight: '500',
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.light.text,
  },
})
