import Cookies from 'js-cookie'
import { useMutation } from 'react-query'
import { API } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../components/toast'

const UseLogin = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async ({ loginData }: { loginData: any }) => {
      const response = await API.post('/auth', loginData)

      return response.data
    },
    onSuccess: (data: any) => {
      Cookies.set('token', data.token)
      Cookies.set('role', data.role)
      Cookies.set('userId', data.userId)
      if (data.role === 'STUDENT') {
        navigate('/student/grade-view-area')
      } else if (data.role === 'ADMIN') {
        navigate('/admin/dashboard')
      } else if (data.role === 'TEACHER') {
        navigate('/admin/dashboard/students-table')
      } else {
        navigate('/login')
      }
    },
    onError: (error: any) => {
      console.log(error)
      if (error.response.data.message === 'Account is blocked. Please contact support.') {
        Toast({
          message: 'Conta bloqueada! entre em contacto com o sector administrativo',
          theme: 'colored',
          toastType: 'error',
        })
      } else if (error.response.data.message === 'Invalid credentials.') {
        Toast({
          message: 'Credências incorrectas',
          theme: 'colored',
          toastType: 'error',
        })
      } else if (error.response.data.message === 'User not found') {
        Toast({
          message: 'Usuário não encontrado',
          theme: 'colored',
          toastType: 'error',
        })
      }
    },
  })
}

export { UseLogin }
