import { useEffect } from 'react'
import { Grades } from '../../components/grades'
import { Header } from './header'

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
      <Header />
      <Grades />
    </main>
  )
}

export { GradeViewArea }
