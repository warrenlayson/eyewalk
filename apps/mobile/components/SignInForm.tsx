import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
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
}

const SignInForm = ({ onSignIn, onForgotPassword }: SignInFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const passwordRef = React.useRef<TextInput | null>(null)
  const onSubmit = handleSubmit(data => {
    onSignIn(data)
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

      <View style={{ marginVertical: 16 }}>
        <Link onPress={onForgotPassword}>Forgot your Password?</Link>
      </View>

      <Button title="Login" onPress={onSubmit} disabled={isSubmitting} />
    </View>
  )
}

export default SignInForm

const styles = StyleSheet.create({})
