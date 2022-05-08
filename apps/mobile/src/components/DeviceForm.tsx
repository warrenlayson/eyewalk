import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ConnectDeviceBodyType } from 'api/src/routes/users/_userId/devices/types'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'
import CheckIconButton from './CheckIconButton'
import FormInput from './FormInput'
import { Text } from './Themed'

export const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  deviceId: yup.string().uuid().required(),
  responseTime: yup.number().min(3).required(),
})

export type DeviceFormProps = {
  deviceId: string
  responseTime: string
} & Omit<ConnectDeviceBodyType, 'responseTime'>

type Props = {
  onSubmit: (data: DeviceFormProps) => void
  mode: 'ADD' | 'EDIT'
}
export default function DeviceForm({ onSubmit, mode }: Props) {
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useFormContext<DeviceFormProps>()
  const navigation = useNavigation()

  const onFormSubmit = handleSubmit(data => {
    onSubmit({ ...data, responseTime: 1000 * +data.responseTime + '' })
    navigation.goBack()
  })

  const firstNameRef = React.useRef<TextInput>(null)
  const lastNameRef = React.useRef<TextInput>(null)
  const responseTimeRef = React.useRef<TextInput>(null)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CheckIconButton onPress={onFormSubmit} disabled={isSubmitting} />
      ),
    })
  }, [navigation, isSubmitting])
  return (
    <View>
      <FormInput
        label="Smart Walking Cane ID"
        control={control}
        name="deviceId"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        editable={mode === 'ADD'}
        onSubmitEditing={() => responseTimeRef.current?.focus()}
        blurOnSubmit={false}
      />

      <View style={{}}>
        <FormInput
          ref={responseTimeRef}
          label="Response Interval in seconds"
          control={control}
          name="responseTime"
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => firstNameRef.current?.focus()}
        />
      </View>

      <FormInput
        ref={firstNameRef}
        label="First Name"
        control={control}
        name="firstName"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => lastNameRef.current?.focus()}
        blurOnSubmit={false}
      />
      <FormInput
        ref={lastNameRef}
        label="Last Name"
        control={control}
        name="lastName"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        blurOnSubmit={false}
        onSubmitEditing={onFormSubmit}
      />

      <Pressable
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          marginVertical: 8,
          width: '100%',
          paddingVertical: 8,
        })}
        onPress={() => {
          navigation.navigate('SetAddress')
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <FontAwesome name="map-marker" size={20} style={{ marginRight: 8 }} />
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text>Set Address</Text>

            <FontAwesome name="pencil" size={20} />
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})
