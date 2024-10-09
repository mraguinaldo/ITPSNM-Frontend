import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { UseCheckEnrollment } from '../../../hooks/useCheckEnrollment'
import { HeaderForAuthenticatedUsers } from '../../../components/headers/for-authenticated-users'
import { Outlet } from 'react-router-dom'
import { useAxiosInterceptor } from '../../../services/api'

const StudentDashboard = () => {
  useAxiosInterceptor()
  const { mutate: useCheckEnrollment, data: student }: any = UseCheckEnrollment()
  const enrollmentNumber = Cookies.get('enrollmentNumber')

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const params = new URLSearchParams({
      [enrollmentNumber ? 'enrollmentNumber' : '']: enrollmentNumber || '',
    })
    useCheckEnrollment(params)
  }, [])

  if (!student) {
    return (
      <h1 className="text=[24px] md:text-[32px] font-semibold justify-center flex items-center h-dvh">
        ...
      </h1>
    )
  }
  return (
    <main>
      <HeaderForAuthenticatedUsers student={student} />
      <Outlet />
    </main>
  )
}

export { StudentDashboard }
