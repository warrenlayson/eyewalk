import { useQuery, useQueryClient } from 'react-query'
import axios from '../lib/axios'
import { LoginResponse } from '../types'

const me = (): Promise<LoginResponse> =>
  axios.get('/auth/me').then(res => res.data)

export default function useMe() {
  const qc = useQueryClient()
  return useQuery('me', me, {
    onSuccess: async data => {
      await qc.cancelQueries('me')

      qc.setQueryData<LoginResponse>('me', data)
    },
    onError: err => {
      console.error(err)
    },
    onSettled: () => {
      qc.invalidateQueries('me')
    },
  })
}
