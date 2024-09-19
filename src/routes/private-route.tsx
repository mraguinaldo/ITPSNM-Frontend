import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseGetData } from '../hooks/useGetData'

interface PropsType {
  children: ReactNode
}

const PrivateRoute = ({ children }: PropsType) => {
  const user = UseGetData('LoginData')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/Login')
    }
  }, [user, navigate])

  return user ? <>{children}</> : null
}

export { PrivateRoute }
