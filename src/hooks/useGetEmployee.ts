import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'

const UseGetEmployee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: any) => {
      const response = await API.get(`/employees/${id}`)

      return response.data
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(['employee'], data)
    },
  })
}

export { UseGetEmployee }
