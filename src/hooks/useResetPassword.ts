import { useMutation } from 'react-query'
import { API } from '../services/api'
import Cookies from 'js-cookie'
import { Toast } from '../components/toast'

const UseResetPassword = () => {
  const token = Cookies.get('token')
  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      const response = await API.post('users/reset-password', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    },
    onError: (error: any) => {
      if (error.response.data.message === 'Password is incorrect.') {
        Toast({ message: 'A palavra-passe actual está incorrecta!', theme: 'colored', toastType: 'error' })
      } else if (error.response.data.message === `Admins cannot change other admins' passwords.`) {
        Toast({
          message: 'Os administradores não podem alterar as senhas de outros administradores.',
          theme: 'colored',
          toastType: 'error',
        })
      } else if (error.response.data.message === 'Students can only change their own password.') {
        Toast({
          message: 'Os alunos só podem alterar sua própria senha.',
          theme: 'colored',
          toastType: 'error',
        })
      } else if (error.response.data.message === 'Forbidden: Access denied') {
        Toast({
          message: 'Proibido: Acesso negado',
          theme: 'colored',
          toastType: 'error',
        })
      } else {
        Toast({ message: 'Erro ao atualizar a palavra-passe!', theme: 'colored', toastType: 'error' })
      }
    },
  })
}
export { UseResetPassword }
