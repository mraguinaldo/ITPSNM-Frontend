import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import type { IEnrollments } from '../interfaces/interfaces'

const UseFetchEnrollments = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      const response = await API.get('/enrollments')
      const { enrollments }: any = response.data as IEnrollments
      return enrollments
    },

    onSuccess: (data) => {
      queryClient.setQueryData(['enrollments'], data)
    },
    onError: (error) => {
      console.log(error)
    },
  })
}

export { UseFetchEnrollments }
