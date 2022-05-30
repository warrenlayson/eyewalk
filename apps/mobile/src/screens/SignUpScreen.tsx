import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  RegisterBodyType,
  RegisterResponseType,
} from 'api/src/routes/auth/register'
import Constants from 'expo-constants'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import Link from '../components/Link'
import Logo from '../components/Logo'
import SignUpForm from '../components/SignUpForm'
import { View } from '../components/Themed'
import axios from '../lib/axios'
import { RootStackParamList } from '../types'

type SignUpScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SignUp'
>

const signup = (data: RegisterBodyType): Promise<RegisterResponseType> =>
  axios.post('/auth/register', data).then(data => data.data)

const SignUpScreen = ({ navigation }: SignUpScreenNavigationProp) => {
  const qc = useQueryClient()
  const mutation = useMutation(signup, {
    onSuccess: async data => {
      await qc.cancelQueries('me')
      qc.setQueryData<RegisterResponseType>('me', data)
    },
    onError: err => {
      console.log(err)
    },
    onSettled: () => {
      qc.invalidateQueries('me')
    },
  })
  const onSignIn = () => navigation.pop()
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <SignUpForm onSignUp={mutation.mutate} />

      <Link onPress={onSignIn}>Already have an account?</Link>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    paddingTop: Constants.statusBarHeight,
  },
})
