import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseEditEmployee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ formData, id }: { formData: any; id: any }) => {
      const response = await API.put(`/employees/${id}`, formData)

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
