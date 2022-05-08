import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { UpdateUserType } from 'api/src/routes/users/update-user'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'
import useMe from '../hooks/useMe'
import CheckIconButton from './CheckIconButton'
import FormInput from './FormInput'

const schema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})
type Props = {
  onEditProfile: (data: UpdateUserType) => void
}
export default function EditProfileForm({ onEditProfile }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    reset,
  } = useForm<UpdateUserType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  })
  const me = useMe()

  const onSubmit = handleSubmit(onEditProfile)

  const lastNameRef = React.useRef<TextInput>(null)
  const emailRef = React.useRef<TextInput>(null)

  const navigation = useNavigation()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Edit Profile',
      headerRight: () => (
        <CheckIconButton onPress={onSubmit} disabled={isSubmitting} />
      ),
    })
  }, [navigation])

  React.useEffect(() => {
    if (me.data) {
      reset({
        email: me.data.email,
        firstName: me.data.firstName,
        lastName: me.data.lastName,
      })
    }
  }, [me.data])

  return (
    <View>
      <FormInput
        label="First Name"
        control={control}
        name="firstName"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => lastNameRef.current?.focus()}
        blurOnSubmit={false}
      />
      <FormInput
        label="Last Name"
        ref={lastNameRef}
        control={control}
        autoCapitalize="none"
        name="lastName"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
        blurOnSubmit={false}
      />
      <FormInput
        label="Email"
        ref={emailRef}
        control={control}
        name="email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={onSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
