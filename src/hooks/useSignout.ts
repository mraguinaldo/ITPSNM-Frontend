import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Toast } from '../components/toast'
import { useQueryClient } from 'react-query'

const UseSignOut = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signOut = () => {
    Cookies.remove('token')
    navigate('/login')
    Toast({ message: 'Sessão Terminada', theme: 'light', toastType: 'success' })
    queryClient.invalidateQueries(['studentData'])
  }

  return { signOut }
}

export { UseSignOut }
