import { useMutation } from 'react-query'
import { API } from '../services/api'
import Cookies from 'js-cookie'

const UseCatchUser = () => {
  const token = Cookies.get('token')
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await API.get(`/user?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
  })
}

export { UseCatchUser }
