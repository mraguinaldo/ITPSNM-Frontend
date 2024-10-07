import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import Cookies from 'js-cookie'

const UseBlockStudent = (key: string) => {
  const queryClient = useQueryClient()
  const token = Cookies.get('token')
  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      const response = await API.post('/users/block', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${key}`])
    },
  })
}

export { UseBlockStudent }
