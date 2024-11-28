import { useMutation } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseSendTransaction = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      const response = await API.post('/transactions', formData)

      return response.data
    },
    onSuccess: () => {
      Toast({ message: 'Comprovativo enviado com sucesso', theme: 'light', toastType: 'success' })
    },
    onError:(error: any) => {
      if(error.response.data.message === 'Transaction was used.'){
        Toast({ message: 'O comprovativo já foi usado...', theme: 'colored', toastType: 'error' })
      }else if(error.response.data.message === 'Employee not found.'){
        Toast({ message: 'Funcionário não encontrado...', theme: 'colored', toastType: 'error' })
      }else if(error.response.data.message === 'Enrollment not found.'){
        Toast({ message: 'Estudante não encontrado...', theme: 'colored', toastType: 'error' })
      }else if(error.response.data.message === 'This transaction belongs to another student.'){
        Toast({ 
          message: 'Este comprovativo já foi usado...', 
          theme: 'colored', 
          toastType: 'error' 
        })}else{
        Toast({ message: 'Erro ao guardar o comprovativo...', theme: 'colored', toastType: 'error' })
      }
    }
  })
}

export { UseSendTransaction }

