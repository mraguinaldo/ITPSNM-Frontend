import { useMutation } from 'react-query'
import { API } from '../services/api'

const UseResetPassword = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      const response = await API.post('users/reset-password', formData)

      return response.data
    },
  })
}
export { UseResetPassword }
