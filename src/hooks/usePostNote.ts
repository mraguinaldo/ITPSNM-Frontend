import { useMutation } from 'react-query'
import { API } from '../services/api'
import Cookies from 'js-cookie'

const UsePostNote = () => {
  const token = Cookies.get('token')

  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      const response = await API.post('/notes', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
    onSuccess: () => {},
    onError: () => {},
  })
}

export { UsePostNote }
