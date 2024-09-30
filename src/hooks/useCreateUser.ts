import { useMutation } from 'react-query'
import { API } from '../services/api'

const UseCreateUser = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      const response = await API.post('/signup', formData)

      return response.data
    },
  })
}

export { UseCreateUser }
