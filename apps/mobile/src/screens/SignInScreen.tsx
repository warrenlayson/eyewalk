import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LoginResponseType, LoginType } from 'api/src/routes/auth/login'
import Constants from 'expo-constants'
import React from 'react'
import { StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import { useMutation, useQueryClient } from 'react-query'
import Link from '../components/Link'
import Logo from '../components/Logo'
import SignInForm from '../components/SignInForm'
import { Text, View } from '../components/Themed'
import axios from '../lib/axios'
import { RootStackParamList } from '../types'

type SignInScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>

const postLogin = (data: LoginType): Promise<LoginResponseType> =>
  axios.post('/auth/login', data).then(data => data.data)

const SignInScreen = ({ navigation }: SignInScreenNavigationProp) => {
  const qc = useQueryClient()
  const loginMutation = useMutation(postLogin, {
    onSuccess: async data => {
      await qc.cancelQueries('me')
      qc.setQueryData<LoginResponseType>('me', data)
    },
    onError: err => {
      console.log(err)
    },
    onSettled: () => {
      qc.invalidateQueries('me')
    },
  })

  const onForgotPassword = () => navigation.navigate('ForgotPassword')
  const onSignUp = () => navigation.navigate('SignUp')
  return (
    <View style={styles.container}>
      <Spinner
        visible={true}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
      <View style={{ alignSelf: 'center' }}>
        <Logo />
      </View>

      <SignInForm
        onForgotPassword={onForgotPassword}
        onSignIn={formData => loginMutation.mutate(formData)}
      />

      <Text style={{ textAlign: 'center', marginVertical: 32 }}>or</Text>

      <Link onPress={onSignUp}>Sign up</Link>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    paddingTop: Constants.statusBarHeight,
  },
})
