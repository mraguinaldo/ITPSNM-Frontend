import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import { UsestoreData } from './useStoreData'
import { Toast } from '../components/toast'

const UseSendEmployeePersonalData = () => {
  const queryClient = useQueryClient()
  const errorMessage = 'Erro ao enviar o formulário'

  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      UsestoreData('IdentityCard', formData)
      const response = await API.post('/employees', formData)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['employees'])
    },
    onError: (error: any) => {
      if (error.response.data.message === 'Identity card number already exists.') {
        Toast({ message: 'O número do Bilhete de Identidade já está cadastrado.', theme: 'dark', toastType: 'error' })
      } else if (error.response.data.message === 'Phone already exists.') {
        Toast({ message: 'O número de telefone já existe.', theme: 'dark', toastType: 'error' })
      } else {
        Toast({ message: errorMessage, theme: 'dark', toastType: 'error' })
      }
    },
  })
}

export { UseSendEmployeePersonalData }
