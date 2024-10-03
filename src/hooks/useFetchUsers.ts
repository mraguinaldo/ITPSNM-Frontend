import { useQuery } from 'react-query'
import { API } from '../services/api'

const UseFetchUsers = (role: string) => {
  return useQuery({
    queryFn: async () => {
      const response = await API.get(`/users?role=${role}`)
      return response.data
    },
    queryKey: ['users', role],
  })
}

export { UseFetchUsers }
