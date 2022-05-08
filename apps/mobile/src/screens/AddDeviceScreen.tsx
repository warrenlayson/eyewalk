import { yupResolver } from '@hookform/resolvers/yup'
import { DeviceWithMetadataWithCaneUserType } from 'api/src/routes/devices/types'
import { ConnectDeviceBodyType } from 'api/src/routes/users/_userId/devices/types'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { useMutation } from 'react-query'
import DeviceForm, { DeviceFormProps, schema } from '../components/DeviceForm'
import { View } from '../components/Themed'
import useMe from '../hooks/useMe'
import axios from '../lib/axios'
import { RootStackScreenProps } from '../types'

const connectDevice = (
  userId: string,
  deviceId: string,
  data: ConnectDeviceBodyType,
): Promise<DeviceWithMetadataWithCaneUserType> =>
  axios
    .put(`/users/${userId}/devices/${deviceId}`, data)
    .then(data => data.data)

export default function AddDeviceScreen({}: RootStackScreenProps<'AddDevice'>) {
  const meQuery = useMe()

  const mutation = useMutation((data: DeviceFormProps) =>
    connectDevice(meQuery.data?.id ?? '', data.deviceId, {
      firstName: data.firstName,
      lastName: data.lastName,
      responseTime: +data.responseTime,
    }),
  )
  const methods = useForm<DeviceFormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      deviceId: '',
      responseTime: '3',
    },
  })

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <DeviceForm onSubmit={mutation.mutate} mode="ADD" />
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
