import { useEffect } from 'react'
import { Header } from './header'
import { StudentsTable } from '../../components/students-table'

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
      <Header />
      <StudentsTable />
    </main>
  )
}

export { StudentViewingArea }
