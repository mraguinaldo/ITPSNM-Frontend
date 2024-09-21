import { DataTableHeader } from './header'
import { Students } from './table'

const StudentsTable = () => {
  return (
    <section id="grade_report" className="bg-white lg:bg-transparent">
      <div className="w-full px-8 py-16 lg:p-11 lg:rounded-[16px] bg-white">
        <DataTableHeader totalStudents={0} />
        <Students />
      </div>
    </section>
  )
}

export { StudentsTable }
