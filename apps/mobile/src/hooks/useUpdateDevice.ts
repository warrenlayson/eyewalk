import {
  DevicePutBodyType,
  DeviceWithMetadataWithCaneUserType,
} from 'api/src/routes/devices/types'
import { useMutation, useQueryClient } from 'react-query'
import { DeviceFormProps } from '../components/DeviceForm'
import axios from '../lib/axios'

const updateDevice = (id: string, data: DevicePutBodyType) =>
  axios.put(`/devices/${id}`, data).then(res => res.data)

export function useUpdateDevice(id: string) {
  const queryClient = useQueryClient()
  return useMutation(
    (data: DeviceFormProps) =>
      updateDevice(id, {
        metadata: {
          responseTime: +data.responseTime,
          caneUser: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
      }),
    {
      onMutate: async (data: DeviceFormProps) => {
        await queryClient.cancelQueries(['devices', id])

        const previousDevice =
          queryClient.getQueryData<DeviceWithMetadataWithCaneUserType>([
            'devices',
            id,
          ])

        if (previousDevice) {
          queryClient.setQueryData(['devices', id], {
            ...previousDevice,
            metadata: {
              ...previousDevice.metadata,
              responseTime: +data.responseTime,
              caneUser: {
                firstName: data.firstName,
                lastName: data.lastName,
              },
            },
          })
        }

        return { previousDevice }
      },
      onError: (err, variables, context) => {
        console.error(err)
        if (context?.previousDevice) {
          queryClient.setQueryData(['devices', id], context.previousDevice)
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['devices', id])
      },
    },
  )
}
