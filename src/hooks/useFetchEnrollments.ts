import { useMutation } from 'react-query'
import { API } from '../services/api'
import type { IEnrollments } from '../interfaces/interfaces'

const UseFetchEnrollments = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await API.get('/enrollments')
      const { enrollments }: any = response.data as IEnrollments
      return enrollments
    },

    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })
}

export { UseFetchEnrollments }
