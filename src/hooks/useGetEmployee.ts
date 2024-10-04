import { useMutation } from 'react-query'
import { API } from '../services/api'

const UseGetEmployee = () => {
  return useMutation({
    mutationFn: async (id: any) => {
      const response = await API.get(`/employees/${id}`)

      return response.data
    },
  })
}

export { UseGetEmployee }
