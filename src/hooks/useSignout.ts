import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Toast } from '../components/toast'

const UseSignOut = () => {
  const navigate = useNavigate()

  const signOut = () => {
    Cookies.remove('token')
    navigate('/login')
    Toast({ message: 'Sessão Terminada', theme: 'light', toastType: 'success' })
  }

  return { signOut }
}

export { UseSignOut }
