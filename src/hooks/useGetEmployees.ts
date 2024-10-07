import { useQuery } from 'react-query'
import { API } from '../services/api'
import Cookies from 'js-cookie'

const UseGetEmployees = (currentPage: number) => {
  const token = Cookies.get('token')
  return useQuery({
    queryFn: async () => {
      const response = await API.get(`employees?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
    queryKey: ['employees'],
  })
}

export { UseGetEmployees }
