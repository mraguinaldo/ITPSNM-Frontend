import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'

const UseBlockStudent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      const response = await API.post('/users/block', formData)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['enrollments'])
    },
  })
}

export { UseBlockStudent }
