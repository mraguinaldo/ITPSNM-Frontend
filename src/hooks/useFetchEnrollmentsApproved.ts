import { API } from '../services/api'
import type { IEnrollments } from '../interfaces/interfaces'
import { useQuery } from 'react-query'

const UseFetchEnrollmentsApproved = (currentPage: number) => {
  return useQuery({
    queryFn: async () => {
      const response = await API.get(`/enrollments/all?paymentState=APPROVED&docsState=APPROVED&page=${currentPage}`)
      const { enrollments }: any = response.data as IEnrollments
      return enrollments
    },

    queryKey: ['enrollmentsAproved'],
  })
}

export { UseFetchEnrollmentsApproved }
