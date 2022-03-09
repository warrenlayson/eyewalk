import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import Constants from 'expo-constants'
import React from 'react'
import { StyleSheet } from 'react-native'
import Link from '../components/Link'
import Logo from '../components/Logo'
import SignInForm from '../components/SignInForm'
import { Text, View } from '../components/Themed'
import type { RootStackParamList } from '../types'

type SignInScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>

const SignInScreen = ({ navigation }: SignInScreenNavigationProp) => {
  const onForgotPassword = () => navigation.navigate('ForgotPassword')
  const onSignUp = () => navigation.navigate('SignUp')
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'center' }}>
        <Logo />
      </View>

      <SignInForm
        onForgotPassword={onForgotPassword}
        onSignIn={a => console.log(a)}
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
