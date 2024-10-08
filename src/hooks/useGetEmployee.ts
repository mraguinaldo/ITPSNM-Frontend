import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import Cookies from 'js-cookie'

const UseGetEmployee = () => {
  const token = Cookies.get('token')
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: any) => {
      const response = await API.get(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(['employee'], data)
    },
  })
}

export { UseGetEmployee }
