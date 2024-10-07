import { useMutation } from 'react-query'
import { API } from '../services/api'
import Cookies from 'js-cookie'

const UseGetEmployee = () => {
  const token = Cookies.get('token')
  return useMutation({
    mutationFn: async (id: any) => {
      const response = await API.get(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
  })
}

export { UseGetEmployee }
