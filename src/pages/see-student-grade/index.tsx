import { useEffect } from 'react'
import { Grades } from '../../components/grades'
import { HeaderForAuthenticatedUsers } from '../../components/headers/for-authenticated-users'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import Cookies from 'js-cookie'

const GradeViewArea = () => {
  const { mutate: useCheckEnrollment, data: student }: any = UseCheckEnrollment()
  const enrollmentNumber = Cookies.get('enrollmentNumber')

  useEffect(() => {
    const changeBodyColor = () => {
      document.body.style.backgroundColor = '#F4F4F4'
    }

    changeBodyColor()
  }, [])

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
        Buscando Informações...
      </h1>
    )
  }

  return (
    <main>
      <HeaderForAuthenticatedUsers student={student} />
      <Grades />
    </main>
  )
}

export { GradeViewArea }
