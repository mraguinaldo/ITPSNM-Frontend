import { useQuery } from 'react-query'
import { API } from '../services/api'
import Cookies from 'js-cookie'

const UseFetchUsers = (role: string) => {
  const token = Cookies.get('token')
  return useQuery({
    queryFn: async () => {
      const response = await API.get(`/users?role=${role}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    },
    queryKey: ['users', role],
  })
}

export { UseFetchUsers }
