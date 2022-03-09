import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
import Button from './Button'
import Input from './Input'

type SignUpFormProps = {
  onSignUp: (a: FormData) => void
}

type FormData = {
  email: string
  password: string
}
const SignUpForm = ({ onSignUp }: SignUpFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const passwordRef = React.useRef<TextInput | null>(null)
  const onSubmit = handleSubmit(data => {
    onSignUp(data)
  })
  return (
    <View>
      <Input
        label="Email"
        control={control}
        name="email"
        error={errors.email && 'This is required'}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        blurOnSubmit={false}
      />
      <Input
        label="Password"
        control={control}
        name="password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        ref={passwordRef}
        onSubmitEditing={onSubmit}
      />

      <View style={{ marginVertical: 32 }}>
        <Button title="Login" onPress={onSubmit} disabled={isSubmitting} />
      </View>
    </View>
  )
}

export default SignUpForm

const styles = StyleSheet.create({})
