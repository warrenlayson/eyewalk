import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'
import Button from './Button'
import Input from './Input'
import Link from './Link'

type SignInFormProps = {
  onSignIn: (a: FormData) => void
  onForgotPassword: () => void
}

type FormData = {
  email: string
  password: string
  firstName: string
  lastName: string
}

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

const SignInForm = ({ onSignIn, onForgotPassword }: SignInFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const lastNameRef = React.useRef<TextInput | null>(null)
  const emailRef = React.useRef<TextInput | null>(null)
  const passwordRef = React.useRef<TextInput | null>(null)
  const onSubmit = handleSubmit(data => {
    onSignIn(data)
  })
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
        ref={emailRef}
        error={errors.email?.message}
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
        error={errors.password?.message}
        autoCapitalize="none"
        autoCorrect={false}
        ref={passwordRef}
        onSubmitEditing={onSubmit}
      />

      <View style={{ marginVertical: 16 }}>
        <Link onPress={onForgotPassword}>Forgot your Password?</Link>
      </View>

      <Button title="Login" onPress={onSubmit} disabled={isSubmitting} />
    </View>
  )
}

export default SignInForm

const styles = StyleSheet.create({})
