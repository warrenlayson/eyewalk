import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import DeviceForm, { DeviceFormProps, schema } from '../components/DeviceForm'
import { View } from '../components/Themed'
import useDevice from '../hooks/useDevice'
import useMe from '../hooks/useMe'
import { useUpdateDevice } from '../hooks/useUpdateDevice'
import { RootStackScreenProps } from '../types'

export default function EditDeviceScreen({
  route,
}: RootStackScreenProps<'EditDevice'>) {
  const meQuery = useMe()

  const { data } = useDevice(meQuery.data?.id ?? '', route.params.id)

  const methods = useForm<DeviceFormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      deviceId: '',
      responseTime: '',
    },
  })

  const mutation = useUpdateDevice(route.params.id)

  React.useEffect(() => {
    if (data) {
      methods?.reset({
        firstName: data.metadata.caneUser?.firstName,
        lastName: data.metadata.caneUser?.lastName,
        deviceId: data.id,
        responseTime: data.metadata.responseTime / 1000 + '',
      })
    }

    return () => {}
  }, [data, methods.reset])

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <DeviceForm onSubmit={mutation.mutate} mode="EDIT" />
      </FormProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})
