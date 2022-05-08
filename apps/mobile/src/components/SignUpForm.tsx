import { yupResolver } from '@hookform/resolvers/yup'
import type { RegisterBodyType } from 'api/src/routes/auth/register'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'
import Button from './Button'
import FormInput from './FormInput'

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
    formState: { isSubmitting },
  } = useForm<RegisterBodyType>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const passwordRef = React.useRef<TextInput>(null)
  const onSubmit = handleSubmit(onSignUp)

  const lastNameRef = React.useRef<TextInput>(null)
  const emailRef = React.useRef<TextInput>(null)
  return (
    <View>
      <FormInput
        label="First Name"
        name="firstName"
        control={control}
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => lastNameRef.current?.focus()}
      />
      <FormInput
        label="Last Name"
        name="lastName"
        ref={lastNameRef}
        control={control}
        autoCorrect={false}
        blurOnSubmit={false}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <FormInput
        label="Email"
        ref={emailRef}
        control={control}
        name="email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
        blurOnSubmit={false}
      />
      <FormInput
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
        <Button title="Sign Up" onPress={onSubmit} disabled={isSubmitting} />
      </View>
    </View>
  )
}

export default SignUpForm

const styles = StyleSheet.create({})
