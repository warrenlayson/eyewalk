import { DeviceWithMetadataWithCaneUserType } from 'api/src/routes/devices/types'
import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import axios from '../lib/axios'

type Device = DeviceWithMetadataWithCaneUserType

const getDeviceById = (userId: string, id: string): Promise<Device> =>
  axios.get('/users/' + userId + '/devices/' + id).then(res => res.data)

export default function useDevice<TData = Device>(
  userId: string,
  id: string,
  options?: Omit<
    UseQueryOptions<Device, AxiosError, TData>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery(['device', id], () => getDeviceById(userId, id), options)
}
