import { useQuery } from 'react-query'
import { API } from '../services/api'

const UseGetEmployees = () => {
  return useQuery({
    queryFn: async () => {
      const response = await API.get('/employees')

      return response.data
    },
    queryKey: ['employees'],
  })
}

export { UseGetEmployees }
