import { useQuery } from 'react-query'
import axios from '../lib/axios'
import { LoginResponse } from '../types'

const me = (): Promise<LoginResponse> =>
  axios.get('/auth/me').then(res => res.data)

export default function useMe() {
  return useQuery('me', me, {
    retry: false,
    staleTime: 1000 * 60 * 60 * 8,
  })
}
