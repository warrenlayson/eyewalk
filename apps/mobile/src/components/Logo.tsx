import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import EyeWalkText from '../assets/images/eyewalk-text.png'

const Logo = () => {
  return (
    <View>
      <Image source={EyeWalkText} style={styles.logo} />
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 120,
    resizeMode: 'stretch',
  },
})
