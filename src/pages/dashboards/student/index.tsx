import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { UseCheckEnrollment } from '../../../hooks/useCheckEnrollment'
import { Outlet } from 'react-router-dom'
import { useAxiosInterceptor } from '../../../services/api'
import { HeaderForAuthenticatedStudent } from '../../../components/headers/for-authenticated-student'
import { ThreeDots } from '../../../components/three-dots'

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

  if (!student) return <ThreeDots />

  return (
    <main>
      <HeaderForAuthenticatedStudent student={student} />
      <Outlet />
    </main>
  )
}

export { StudentDashboard }
