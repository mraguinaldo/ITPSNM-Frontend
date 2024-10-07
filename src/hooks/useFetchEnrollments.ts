import { API } from '../services/api'
import type { IEnrollments } from '../interfaces/interfaces'
import { useQuery } from 'react-query'
import Cookies from 'js-cookie'

const UseFetchEnrollments = () => {
  const token = Cookies.get('token')
  return useQuery({
    queryFn: async () => {
      const response = await API.get('/enrollments/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const { enrollments }: any = response.data as IEnrollments
      return enrollments
    },

    queryKey: ['enrollments'],
  })
}

export { UseFetchEnrollments }
