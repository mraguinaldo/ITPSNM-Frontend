import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseApproveEnrollment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ formData, enrollmentId }: { formData: any; enrollmentId: any }) => {
      const response = await API.put(`/enrollments/${enrollmentId}`, formData)

      return response.data
    },
    onSuccess: () => {
      Toast({
        message: 'Matrícula aprovada',
        theme: 'colored',
        toastType: 'success',
      })
      queryClient.invalidateQueries(['enrollments'])
      queryClient.invalidateQueries(['enrollmentsAproved'])
    },
    onError: (error: any) => {
      if(error.response.data.message === 'The student has outstanding enrollment debts.'){
        Toast({ message: 'O aluno tem dívidas de matrícula', theme: 'colored', toastType: 'error' })
      }else{
        Toast({
          message: 'Erro ao aprovar a matrícula',
          theme: 'colored',
          toastType: 'error',
        })
      }
      
    },
  })
}

export { UseApproveEnrollment }
