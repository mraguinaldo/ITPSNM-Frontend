import { UseFetchEnrollments } from '../../hooks/useFetchEnrollments'
import { DataTableHeader } from './header'
import { Students } from './table'
import { ProgressBar } from '../progress-bar'

const StudentsTable = () => {
  const { data: students, isLoading } = UseFetchEnrollments()

  if (isLoading) return <ProgressBar />

  return (
    <section id="grade_report" className="bg-white lg:bg-black">
      <div className="w-full px-8 py-16 lg:p-11 lg:rounded-[16px] bg-white">
        <DataTableHeader totalStudents={students?.items.length || 0} students={students} />
        <Students students={students} />
      </div>
    </section>
  )
}

export { StudentsTable }
