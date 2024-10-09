import { useQuery } from 'react-query'
import { API } from '../services/api'

const UseGetEmployees = (currentPage: number) => {
  return useQuery({
    queryFn: async () => {
      const response = await API.get(`employees?page=${currentPage}`)

      return response.data
    },
    queryKey: ['employees'],
  })
}

export { UseGetEmployees }
