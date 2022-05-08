import React from 'react'
import { useController } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import Input from './Input'

type FormInputProps = {
  name: string
  label?: string
  error?: string
  control?: any
} & TextInputProps

const FormInput = React.forwardRef<TextInput, FormInputProps>(
  ({ label, control, name, style, ...rest }: FormInputProps, ref) => {
    const {
      field: { onChange, onBlur, value },
      fieldState: { error },
    } = useController({ control, name })
    return (
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <Input
          ref={ref}
          style={style}
          onChangeText={onChange}
          value={value}
          onBlur={onBlur}
          {...rest}
        />
        {error && <Text style={styles.error}>{error.message}</Text>}
      </View>
    )
  },
)

export default FormInput

const styles = StyleSheet.create({
  label: {
    margin: 8,
    marginLeft: 0,
  },
  error: {
    color: 'red',
  },
})
