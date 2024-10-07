import { useEffect } from 'react'
import { Grades } from '../../components/grades'
import { HeaderForAuthenticatedUsers } from '../../components/headers/for-authenticated-users'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import Cookies from 'js-cookie'
import { useQueryClient } from 'react-query'

const GradeViewArea = () => {
  const enrollmentNumber = Cookies.get('enrollmentNumber')
  const queryClient = useQueryClient()
  const student: any = queryClient.getQueryData(['studentData'])

  useEffect(() => {
    const changeBodyColor = () => {
      document.body.style.backgroundColor = '#F4F4F4'
    }

    changeBodyColor()
  }, [])

  const { mutate: useCheckEnrollment }: any = UseCheckEnrollment()
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const params = new URLSearchParams({
      [enrollmentNumber ? 'enrollmentNumber' : '']: enrollmentNumber || '',
    })
    useCheckEnrollment(params)
  }, [])

  return (
    <main>
      <HeaderForAuthenticatedUsers student={student} />
      <Grades />
    </main>
  )
}

export { GradeViewArea }
