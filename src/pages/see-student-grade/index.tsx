import { useEffect } from 'react'
import { Grades } from '../../components/grades'
import { HeaderForAuthenticatedUsers } from '../../components/header-for-authenticated-users'

const GradeViewArea = () => {
  const ChangeBodyColor = () => {
    document.body.style.backgroundColor = '#F4F4F4'
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    ChangeBodyColor()
  }, [])

  return (
    <main>
      <HeaderForAuthenticatedUsers />
      <Grades />
    </main>
  )
}

export { GradeViewArea }
