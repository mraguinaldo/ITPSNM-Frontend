import { useEffect } from 'react'
import { StudentsTable } from '../../components/students-table'
import { HeaderForAuthenticatedUsers } from '../../components/header-for-authenticated-users'

const StudentViewingArea = () => {
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
      <StudentsTable />
    </main>
  )
}

export { StudentViewingArea }
