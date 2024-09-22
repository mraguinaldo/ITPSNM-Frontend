import { Header } from './header'
import { useEffect, useState } from 'react'
import { UseGetData } from '../../hooks/useGetData'
import { FAKEUSERS } from '../../utils'
import { TableContent } from './table'

const Grades = () => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const loginData: { email: string; password: string } = UseGetData('LoginData')
      const { email, password } = loginData

      const currentUser = FAKEUSERS.find((user) => user.email === email && user.password === password)

      if (currentUser) {
        setUser(currentUser)
      }
    }

    fetchData()
  }, [])

  if (!user) {
    return (
      <h1 className="text=[24px] md:text-[32px] font-semibold justify-center flex items-center h-dvh">
        Buscando Informações...
      </h1>
    )
  }

  return (
    <section id="grade_report" className="pt-40 lg:px-6 bg-white lg:bg-transparent">
      <div className="w-full max-w-[1296px] flex flex-col gap-9 m-auto p-6 lg:p-11 lg:rounded-[16px] bg-white">
        <Header user={user} details={user.details} />
        <TableContent user={user} />
      </div>
      )
    </section>
  )
}

export { Grades }
