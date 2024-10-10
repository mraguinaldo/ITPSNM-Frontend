import { useMutation } from 'react-query'
import { API } from '../services/api'
import { UsestoreData } from './useStoreData'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../components/toast'

const UseSendStudentPersonalData = () => {
  const navigate = useNavigate()
  const nextForm = '/formulario-para-matricula'

  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      UsestoreData('IdentityCard', formData)
      const response = await API.post('/students', formData)

      return response.data
    },
    onSuccess: () => {
      navigate(nextForm)
    },
    onError: (error: any) => {
      if (error.response.data.message === 'Phone already exists.') {
        Toast({ message: 'O número de telefone já se encontra em uso.', theme: 'dark', toastType: 'error' })
      } else if (error.response.data.message === 'Identity card number already exists.') {
        Toast({ message: 'Já existe uma inscrição com esse número do BI', theme: 'dark', toastType: 'error' })
      } 
    },
  })
}

export { UseSendStudentPersonalData }
