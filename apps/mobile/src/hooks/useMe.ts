import type { CurrentUserType } from 'api/src/routes/auth/current-user'
import { useQuery } from 'react-query'
import axios from '../lib/axios'

const me = (): Promise<CurrentUserType> =>
  axios.get('/auth/me').then(res => res.data)

export default function useMe() {
  return useQuery('me', me, {
    retry: false,
    staleTime: 1000 * 60 * 60 * 8,
  })
}
