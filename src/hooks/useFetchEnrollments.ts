import { API } from '../services/api'
import type { IEnrollments } from '../interfaces/interfaces'
import { useQuery } from 'react-query'

const UseFetchEnrollments = (currentPage: number) => {
  return useQuery({
    queryFn: async () => {
      const response = await API.get(`enrollments/all?page=${currentPage}`)
      const { enrollments }: any = response.data as IEnrollments
      return enrollments
    },

    queryKey: ['enrollments'],
  })
}

export { UseFetchEnrollments }
