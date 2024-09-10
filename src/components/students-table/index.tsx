import { DataTableHeader } from './header'
import { Students } from './table'

const StudentsTable = () => {
  return (
    <section id="grade_report" className="pt-40 lg:px-6 bg-white lg:bg-transparent">
      <div className="w-full max-w-[1296px] m-auto p-6 lg:p-11 lg:rounded-[16px] bg-white">
        <DataTableHeader totalStudents={0} />
        <Students />
      </div>
    </section>
  )
}

export { StudentsTable }
