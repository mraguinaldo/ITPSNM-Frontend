import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const UseRedirect = () => {
  const navigate = useNavigate()
  const role = Cookies.get('role')

  const redirect = () => {
    if (!role) {
      console.log('Role não encontrado, redirecionando para a página inicial')
      navigate('/')
      return
    }

    switch (role) {
      case 'STUDENT':
        navigate('student/grade-view-area')
        break
      case 'ADMIN':
      case 'TEACHER':
        navigate('/admin/dashboard')
        break
      default:
        navigate('/')
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (role) redirect()
  }, [navigate, role])

  return { redirect }
}

export { UseRedirect }
