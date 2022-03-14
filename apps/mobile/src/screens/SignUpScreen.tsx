import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import Constants from 'expo-constants'
import React from 'react'
import { StyleSheet } from 'react-native'
import Link from '../components/Link'
import Logo from '../components/Logo'
import SignUpForm from '../components/SignUpForm'
import { View } from '../components/Themed'
import { RootStackParamList } from '../types'

type SignUpScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SignUp'
>

const SignUpScreen = ({ navigation }: SignUpScreenNavigationProp) => {
  const onSignIn = () => navigation.pop()
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <SignUpForm onSignUp={a => console.log(a)} />

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
