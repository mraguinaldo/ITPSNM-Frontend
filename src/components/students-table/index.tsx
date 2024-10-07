import { DataTableHeader } from './header'
import { Students } from './table'
import { useQueryClient } from 'react-query'

const StudentsTable = () => {
  const queryClient = useQueryClient()
  const students: any = queryClient.getQueryData(['enrollmentsAproved'])

  const totalStudents = students.items.filter((student: any) => student.students?.User)

  return (
    <section id="grade_report" className="bg-white lg:bg-black">
      <div className="w-full px-8 py-16 lg:p-11 lg:rounded-[16px] bg-white">
        <DataTableHeader totalStudents={totalStudents.length || 0} students={students} />
        <Students students={students} />
      </div>
    </section>
  )
}

export { StudentsTable }
