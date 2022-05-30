import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

const Input = React.forwardRef<TextInput, TextInputProps>(
  ({ style, ...props }, ref) => {
    return <TextInput ref={ref} style={[styles.input, style]} {...props} />
  },
)

export default Input

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f7f7f7',
    borderColor: 'black',
    height: 50,
    padding: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
})
