import { useMutation } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseMakePayment = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      const response = await API.post('/payments', formData)

      return response.data
    },
    onSuccess: () => {
      Toast({ message: 'Pagamento efectuado com sucesso...', theme: 'light', toastType: 'success' })
    },
    onError:(error: any) => {
      if(error.response.data.message === 'Transaction was used.'){
        Toast({ 
          message: 'A Transação já foi usada...', 
          theme: 'colored', 
          toastType: 'error' 
        })
      }else if(error.response.data.message === 'Transaction not found.'){
        Toast({ 
          message: 'Transação não encontrada...', 
          theme: 'colored', 
          toastType: 'error'
        })
      }else if(error.response.data.message === 'Employee not found.'){
        Toast({ 
          message: 'Funcionário não encontrado...', 
          theme: 'colored', 
          toastType: 'error' 
        })
      }else if(error.response.data.message === 'Enrollment not found.'){
        Toast({ 
          message: 'Estudante não encontrado...', 
          theme: 'colored', 
          toastType: 'error' 
        })
      }else if(error.response.data.message === 'Invoice not found.'){
        Toast({ 
          message: 'Fatura não encontrada...', 
          theme: 'colored', 
          toastType: 'error' 
        })
      }else if(error.response.data.message === 'Insufficient funds.'){
        Toast({ 
          message: 'Saldo insuficiente', 
          theme: 'colored', 
          toastType: 'error' 
        })
      }else if(error.response.data.message === 'Payment already exists.'){
        Toast({ 
          message: 'Este pagamento já foi efectuado!', 
          theme: 'light', 
          toastType: 'warning' 
        })
      }else{
        Toast({ 
          message: 'Erro ao efectuar o pagamento...', 
          theme: 'colored', 
          toastType: 'error' 
        })
      }
    }
  })
}

export { UseMakePayment }

