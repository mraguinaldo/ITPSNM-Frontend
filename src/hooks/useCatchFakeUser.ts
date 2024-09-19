import { FAKEUSERS } from '../utils'

const UseCatchFakeUser = (email: string, password: string) => {
  const user = FAKEUSERS.find(
    (user: { email: string; password: string }) => user.email === email && user.password === password,
  )
  return user
}

export { UseCatchFakeUser }
