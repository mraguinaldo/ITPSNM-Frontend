import { useQuery } from 'react-query'
import { API } from '../services/api'

const UseFetchUsers = (role: string, currentPage: number) => {
  return useQuery({
    queryFn: async () => {
      const response = await API.get(`/users?role=${role}&page=${currentPage}`)
      return response.data
    },
    queryKey: ['users', role],
  })
}

export { UseFetchUsers }
