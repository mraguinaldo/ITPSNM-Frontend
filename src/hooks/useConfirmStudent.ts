import { useMutation } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseConfirmStudent = () => {
  return useMutation({
    mutationFn: async ({formData}: {formData: any}) => {
      console.log(formData)
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
    onError: (error: any)=>{
      if(error.response.data.message === 'Confirmation Only For Students have Enrollment approved.'){
        Toast({
          message: 'Confirmação só é concluída para alunos com matrícula aprovada.',
          theme: 'colored',
          toastType: 'error',
        })
      }else{
      Toast({
        message: 'Erro ao confirmar o estudante',
        theme: 'colored',
        toastType: 'error',
      })}
    }
  })
}

export { UseConfirmStudent }
