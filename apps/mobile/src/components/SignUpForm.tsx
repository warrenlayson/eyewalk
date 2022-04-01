import type { RegisterBodyType } from 'api/src/routes/auth/register'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'
import Button from './Button'
import Input from './Input'

type SignUpFormProps = {
  onSignUp: (a: RegisterBodyType) => void
}
const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

const SignUpForm = ({ onSignUp }: SignUpFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterBodyType>()

  const passwordRef = React.useRef<TextInput | null>(null)
  const onSubmit = handleSubmit(data => {
    onSignUp(data)
  })

  const lastNameRef = React.useRef<TextInput | null>(null)
  const emailRef = React.useRef<TextInput | null>(null)
  return (
    <View>
      <Input
        label="First Name"
        name="firstName"
        control={control}
        error={errors.firstName?.message}
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => lastNameRef.current?.focus()}
      />
      <Input
        label="Last Name"
        name="lastName"
        ref={lastNameRef}
        control={control}
        error={errors.lastName?.message}
        autoCorrect={false}
        blurOnSubmit={false}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
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
