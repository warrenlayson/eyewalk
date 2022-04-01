import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateUserType } from 'api/src/routes/users/update-user'
import React from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import * as yup from 'yup'
import Input from './Input'

type EditProfileForm = {
  onUpdateUser: (a: UpdateUserType) => void
}

const schema = yup.object({
  firstName: yup.string().min(1).max(70).required(),
  lastName: yup.string().min(1).max(70).required(),
  address: yup.string().required(),
  age: yup.number().min(1).max(120).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

const EditProfileForm = ({}: EditProfileForm) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UpdateUserType>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })
  return (
    <View>
      <Input label="First Name" control={control} name="firstName" />
      <Input label="Last Name" control={control} name="lastName" />
      <Input label="Email" control={control} name="email" />
    </View>
  )
}

export default EditProfileForm

const styles = StyleSheet.create({})
