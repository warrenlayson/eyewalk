import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { ConnectDeviceBodyType } from 'api/src/routes/users/_userId/devices/types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'
import CheckIconButton from './CheckIconButton'
import Input from './Input'

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  deviceId: yup.string().uuid().required(),
})

export type ConnectDeviceFormProps = {
  deviceId: string
} & ConnectDeviceBodyType

type Props = {
  onAddDevice: (data: ConnectDeviceFormProps) => void
}
export default function AddDeviceForm({ onAddDevice }: Props) {
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ConnectDeviceFormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      deviceId: '',
    },
  })

  const onSubmit = handleSubmit(onAddDevice)

  const firstNameRef = React.useRef<TextInput>(null)
  const lastNameRef = React.useRef<TextInput>(null)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CheckIconButton onPress={onSubmit} disabled={isSubmitting} />
      ),
    })
  }, [navigation])
  return (
    <View>
      <Input
        label="Smart Walking Cane ID"
        control={control}
        name="deviceId"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => firstNameRef.current?.focus()}
        blurOnSubmit={false}
      />

      <Input
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
      <Input
        ref={lastNameRef}
        label="Last Name"
        control={control}
        name="lastName"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        blurOnSubmit={false}
        onSubmitEditing={onSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
