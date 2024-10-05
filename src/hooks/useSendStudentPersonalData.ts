import { useMutation } from 'react-query'
import { API } from '../services/api'
import { UsestoreData } from './useStoreData'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../components/toast'

const UseSendStudentPersonalData = () => {
  const navigate = useNavigate()
  const nextForm = '/enrollment-form'
  const errorMessage = 'Erro ao enviar o formulário'

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
      console.log(error)
      Toast({ message: errorMessage, theme: 'dark', toastType: 'error' })
    },
  })
}

export { UseSendStudentPersonalData }
