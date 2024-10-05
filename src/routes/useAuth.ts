import Cookies from 'js-cookie'

interface AuthData {
  token: string | undefined
  role: string | undefined
}

const UseAuth = (): AuthData | null => {
  const token = Cookies.get('token')
  const role = Cookies.get('role')

  if (!token) {
    return null
  }

  return { token, role }
}
export { UseAuth }
