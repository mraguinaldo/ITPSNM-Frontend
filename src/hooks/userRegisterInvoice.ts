import { useMutation } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseRegisterInvoice = () => {
  return useMutation({
    mutationFn: async ({formData}: {formData: any}) => {
      const response = await API.post('/invoices', formData)

      return response.data
    },
    onSuccess: ()=>{
      Toast({ message: 'Fatura cadastrada com sucesso', theme: 'light', toastType: 'success' })
    },
    onError: (error: any)=> {
      if(error.response.data.message === 'Enrollment not found.'){
        Toast({ message: 'Estudante não encontrado', theme: 'colored', toastType: 'error' })
      }else{
        Toast({ message: 'Erro ao cadastrar a fatura', theme: 'colored', toastType: 'error' })
      }
    }
  })
}

export { UseRegisterInvoice }
