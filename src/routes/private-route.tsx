// src/routes/PrivateRoute.tsx
import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseAuth } from './useAuth'

interface PrivateRouteProps {
  children: ReactNode
  allowedRoles: string[]
  redirectTo: string
}

const PrivateRoute = ({ children, allowedRoles, redirectTo }: PrivateRouteProps) => {
  const auth = UseAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth?.token) {
      navigate(redirectTo)
    } else if (!allowedRoles.includes(auth.role || '')) {
      navigate(redirectTo)
    }
  }, [auth, navigate, redirectTo, allowedRoles])

  if (!auth || !allowedRoles.includes(auth.role || '')) {
    return null
  }

  return <>{children}</>
}

export { PrivateRoute }
