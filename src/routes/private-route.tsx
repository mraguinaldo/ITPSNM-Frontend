import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

interface PropsType {
  children: ReactNode
  path: string
}

const useAuth = () => {
  const token = Cookies.get('token')

  if (!token) {
    return null
  }

  return token
}

const PrivateRoute = ({ children, path }: PropsType) => {
  const token = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate(path)
    }
  }, [token, navigate, path])

  return token ? <>{children}</> : null
}
export { PrivateRoute }
