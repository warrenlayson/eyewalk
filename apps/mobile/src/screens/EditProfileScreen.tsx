import { FontAwesome } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserWithoutPasswordType } from 'api/src/routes/users/types'
import type { UpdateUserType } from 'api/src/routes/users/update-user'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import * as yup from 'yup'
import Input from '../components/Input'
import { View } from '../components/Themed'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import useMe from '../hooks/useMe'
import axios from '../lib/axios'
import { RootStackScreenProps } from '../types'

const schema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

const updateUser = (
  id: number,
  data: UpdateUserType,
): Promise<UserWithoutPasswordType> =>
  axios.put(`/users/${id}`, data).then(data => data.data)

const EditProfileScreen = ({
  navigation,
}: RootStackScreenProps<'EditProfile'>) => {
  const colorScheme = useColorScheme()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UpdateUserType>({
    resolver: yupResolver(schema),
  })

  const me = useMe()

  const qc = useQueryClient()
  const updateUserMutation = useMutation(
    (data: UpdateUserType) => updateUser(me.data?.id ?? 0, data),
    {
      onMutate: async data => {
        await qc.cancelQueries('me')

        const previousData = qc.getQueryData<UserWithoutPasswordType>('me')

        qc.setQueryData('me', () => ({ ...previousData, ...data }))

        return { previousData }
      },
      onError: (err, newMe, ctx) => {
        if ((ctx as any)?.previousData) {
          qc.setQueryData('me', (ctx as any).previousData)
        }
      },
      onSettled: () => {
        qc.invalidateQueries('me')
      },
    },
  )

  React.useEffect(() => {
    if (me.data) {
      setValue('email', me.data.email)
      setValue('firstName', me.data.firstName)
      setValue('lastName', me.data.lastName)
    }
  }, [me.data])

  const onSubmit = handleSubmit(data => {
    updateUserMutation.mutate(data)
    console.log('firstName', data.firstName)
  })

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Edit Profile',
      headerRight: () => (
        <TouchableOpacity onPress={onSubmit} disabled={isSubmitting}>
          <View style={{ borderRadius: 100 }}>
            <FontAwesome
              name="check"
              color={Colors[colorScheme].text}
              size={20}
            />
          </View>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const lastNameRef = React.useRef<TextInput | null>(null)
  const emailRef = React.useRef<TextInput | null>(null)

  return (
    <View style={styles.container}>
      <Input
        label="First Name"
        control={control}
        name="firstName"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => lastNameRef.current?.focus()}
        blurOnSubmit={false}
      />
      <Input
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
      <Input
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

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})
