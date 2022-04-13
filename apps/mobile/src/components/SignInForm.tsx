import { yupResolver } from '@hookform/resolvers/yup'
import type { LoginType } from 'api/src/routes/auth/login'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'
import Button from './Button'
import Input from './Input'
import Link from './Link'

type SignInFormProps = {
  onSignIn: (a: LoginType) => void
  onForgotPassword: () => void
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

const SignInForm = ({ onSignIn, onForgotPassword }: SignInFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const passwordRef = React.useRef<TextInput | null>(null)
  const onSubmit = handleSubmit(data => {
    onSignIn({ email: data.email.trim(), password: data.password.trim() })
  })
  return (
    <View>
      <Input
        label="Email"
        control={control}
        name="email"
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
