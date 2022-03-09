import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Platform,
  StyleSheet,
  TextProps,
  TouchableWithoutFeedback,
} from 'react-native'
import { Text } from './Themed'
import React from 'react'

type LinkProps = React.PropsWithChildren<{
  onPress: (e: NativeSyntheticEvent<NativeTouchEvent>) => void
}>

function Link({ onPress, children }: LinkProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableWithoutFeedback>
  )
}

export default Link

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
})
