import type { LoginResponseType } from 'api/src/routes/auth/login'
import { useQuery } from 'react-query'
import axios from '../lib/axios'

const me = (): Promise<LoginResponseType> =>
  axios.get('/auth/me').then(res => res.data)

export default function useMe() {
  return useQuery('me', me, {
    retry: false,
    staleTime: 1000 * 60 * 60 * 8,
  })
}
