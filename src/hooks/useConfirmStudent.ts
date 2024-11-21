import { useMutation } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseConfirmStudent = () => {
  return useMutation({
    mutationFn: async ({formData}: {formData: any}) => {
      const response = await API.put('enrollments/confirmation', formData)

      return response.data
    },
    onSuccess: () => {
      Toast({
        message: 'Estudante confirmado com sucesso',
        theme: 'colored',
        toastType: 'success',
      })
    },
    onError: ()=>{
      Toast({
        message: 'Erro ao confirmar o estudante',
        theme: 'colored',
        toastType: 'error',
      })
    }
  })
}

export { UseConfirmStudent }
