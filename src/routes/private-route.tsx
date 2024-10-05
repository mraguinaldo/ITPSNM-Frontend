import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseAuth } from './useAuth'

interface PrivateRouteProps {
  children: ReactNode
  allowedRoles: string[]
  redirectTo: string
}

interface AuthData {
  token: string | undefined
  role: string | undefined
}

const PrivateRoute = ({ children, allowedRoles, redirectTo }: PrivateRouteProps) => {
  const auth: AuthData | null = UseAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth || !auth.token || !allowedRoles.includes(auth.role || '')) {
      navigate(redirectTo)
    }
  }, [auth, navigate, redirectTo, allowedRoles])

  return auth && allowedRoles.includes(auth.role || '') ? <>{children}</> : null
}

export { PrivateRoute }
