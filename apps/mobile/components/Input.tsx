import React from 'react'
import { useController } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

type InputProps = {
  name: string
  label?: string
  error?: string
  control?: any
} & TextInputProps

const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, control, name, style, ...rest }: InputProps, ref) => {
    const {
      field: { onChange, onBlur, value },
    } = useController({ control, name })
    return (
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          onChangeText={onChange}
          value={value}
          onBlur={onBlur}
          {...rest}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    )
  },
)

export default Input

const styles = StyleSheet.create({
  label: {
    margin: 8,
    marginLeft: 0,
  },
  input: {
    backgroundColor: '#f7f7f7',
    borderColor: 'black',
    height: 50,
    padding: 16,
    borderRadius: 4,
  },
  error: {
    color: 'red',
  },
})
