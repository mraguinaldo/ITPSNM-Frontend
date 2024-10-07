import { DataTableHeader } from './header'
import { Students } from './table'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

const EnrollmentsTable = () => {
  const [enrollmenType, setEnrollmenType] = useState<string>('PENDING')
  const queryClient = useQueryClient()
  const [students, setStudents] = useState<any>()
  const enrollmentsPending: any = queryClient.getQueryData(['enrollments'])
  const enrollmentsApproved: any = queryClient.getQueryData(['enrollmentsAproved'])
  console.log(enrollmentsApproved)
  console.log(enrollmentsPending)

  useEffect(() => {
    if (enrollmenType === 'PENDING') {
      setStudents(enrollmentsPending)
    } else {
      setStudents(enrollmentsApproved)
    }
  }, [enrollmenType, enrollmentsApproved, enrollmentsPending])

  return (
    <section id="grade_report" className="bg-white lg:bg-black">
      <div className="w-full px-8 py-16 lg:p-11 lg:rounded-[16px] bg-white">
        <DataTableHeader totalStudents={students?.totalItems} students={students} />
        <Students
          students={students}
          fetchEnrollmentsApproved={() => setEnrollmenType('APPROVED')}
          fetchEnrollmentsPending={() => setEnrollmenType('PENDING')}
          enrollmentType={enrollmenType}
        />
      </div>
    </section>
  )
}

export { EnrollmentsTable }
