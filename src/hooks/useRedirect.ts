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
        console.log('Redirecionando estudante para a área de notas')
        navigate('student/grade-view-area')
        break
      case 'ADMIN':
      case 'TEACHER':
        console.log('Redirecionando admin ou professor para o dashboard')
        navigate('/admin/dashboard')
        break
      default:
        console.log('Role não reconhecido, redirecionando para a página inicial')
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
