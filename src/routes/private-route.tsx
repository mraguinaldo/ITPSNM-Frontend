import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseGetData } from '../hooks/useGetData'

interface PropsType {
  children: ReactNode
  path: string
}

const PrivateRoute = ({ children, path }: PropsType) => {
  const user = UseGetData('LoginData')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate(path)
    }
  }, [user, navigate, path])

  return user ? <>{children}</> : null
}

export { PrivateRoute }
