import { DeviceWithMetadataWithCaneUserType } from 'api/src/routes/devices/types'
import { ConnectDeviceBodyType } from 'api/src/routes/users/_userId/devices/types'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useMutation } from 'react-query'
import AddDeviceForm, {
  ConnectDeviceFormProps,
} from '../components/AddDeviceForm'
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

  const mutation = useMutation((data: ConnectDeviceFormProps) =>
    connectDevice(meQuery.data?.id ?? '', data.deviceId, {
      firstName: data.firstName,
      lastName: data.lastName,
    }),
  )

  return (
    <View style={styles.container}>
      <AddDeviceForm onAddDevice={mutation.mutate} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})
