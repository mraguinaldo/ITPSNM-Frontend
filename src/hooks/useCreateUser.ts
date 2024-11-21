import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      const response = await API.post('/signup', formData)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      queryClient.invalidateQueries(['enrollments'])
      queryClient.invalidateQueries(['enrollmentsAproved'])
    },
    onError: (error: any) => {
      if (error.response.data.message === 'User Enrollment has in use.') {
        Toast({
          message: 'O número de inscrição já se encontra em uso!',
          theme: 'colored',
          toastType: 'error',
        })
      } else if (error.response.data.message === 'Enrollment not found.') {
        Toast({
          message: 'Matrícula não encontrada...',
          theme: 'colored',
          toastType: 'error',
        })
      }else if (error.response.data.message === 'Employee not found.') {
        Toast({
          message: 'Funcionário não encontrado...',
          theme: 'colored',
          toastType: 'error',
        })
      } else if (error.response.data.message === 'User Employee has in use.') {
        Toast({
          message: 'O número de inscrição já se encontra em uso!',
          theme: 'colored',
          toastType: 'error',
        })
      }
    },
  })
}

export { UseCreateUser }
