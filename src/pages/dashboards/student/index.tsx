import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { UseCheckEnrollment } from '../../../hooks/useCheckEnrollment'
import { Outlet } from 'react-router-dom'
import { useAxiosInterceptor } from '../../../services/api'
import { ProgressBar } from '../../../components/progress-bar'
import { HeaderForAuthenticatedStudent } from '../../../components/headers/for-authenticated-student'

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

  if (!student) return <ProgressBar />

  return (
    <main>
      <HeaderForAuthenticatedStudent student={student} />
      <Outlet />
    </main>
  )
}

export { StudentDashboard }
