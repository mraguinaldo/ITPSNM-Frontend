import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'
import Cookies from 'js-cookie'

const UseEditEmployee = () => {
  const token = Cookies.get('token')
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ formData, id }: { formData: any; id: any }) => {
      const response = await API.put(`/employees/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['employees'])
      queryClient.invalidateQueries(['employee'])
    },
    onError: () => {
      Toast({ message: 'Erro ao editar funcionário', theme: 'colored', toastType: 'error' })
    },
  })
}

export { UseEditEmployee }
