import { useMutation } from 'react-query'
import { API } from '../services/api'

const UseCatchUser = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await API.get(`/user?email=${email}`)

      return response.data
    },
  })
}

export { UseCatchUser }

