import { DataTableHeader } from './header'
import { Students } from './table'
import { useEffect, useState } from 'react'
import { UseFetchEnrollments } from '../../hooks/useFetchEnrollments'
import { UseFetchEnrollmentsApproved } from '../../hooks/useFetchEnrollmentsApproved'
import { TitleForProcessing } from '../title-for-processing'
import { ButtonForPagination } from '../button-for-pagination'
import { ButtonForSearchOptions } from '../button-for-search-options'

const EnrollmentsTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [enrollmentType, setEnrollmenType] = useState<string>('PENDING')
  const [students, setStudents] = useState<any>()
  const {
    data: enrollmentsPending,
    refetch: useFetchEnrollments,
  }: any = UseFetchEnrollments(currentPage)


  const {
    data: enrollmentsApproved,
    refetch: useFetchEnrollmentsApproved,
  }: any = UseFetchEnrollmentsApproved(currentPage)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (currentPage && currentPage) {
      if (enrollmentType === 'PENDING') {
        useFetchEnrollments()
      } else {
        useFetchEnrollmentsApproved()
      }
    }
  }, [currentPage])


  useEffect(() => {
    if (enrollmentType === 'PENDING') {
      setStudents(enrollmentsPending)
    } else {
      setStudents(enrollmentsApproved)
    }
  }, [enrollmentType, enrollmentsApproved, enrollmentsPending])

  return (
    <section id="grade_report" className="bg-white lg:bg-black">
      <div className="flex flex-col gap-6 w-full px-8 py-16 lg:p-11 lg:rounded-[16px] bg-white">
        <DataTableHeader totalStudents={students?.totalItems} students={students} />
        <div className="flex gap-4 flex-wrap">
          <ButtonForSearchOptions
            content={`PENDENTES ( ${enrollmentsPending?.items?.length} )`}
            onClick={() => setEnrollmenType('PENDING')}
            option={enrollmentType === 'PENDING'}
          />
          <ButtonForSearchOptions
            content={`APROVADAS ( ${enrollmentsApproved?.items?.length} )`}
            onClick={() => setEnrollmenType('APPROVED')}
            option={enrollmentType === 'APPROVED'}
          />
        </div>
        {!enrollmentsPending || !enrollmentsApproved ? (
          <TitleForProcessing title='Buscando matrículas...' />
        ) : (
          <Students students={students} />
        )}
        <div className="flex gap-2 flex-wrap w-full">
          {Array.from(
            { length: enrollmentType === 'PENDING' ? enrollmentsPending?.totalPages : enrollmentsApproved?.totalPages },
            (_, index: number) => (
              <ButtonForPagination
                key={index}
                content={index + 1}
                isActive={currentPage === index + 1}
                onClick={() => {
                  if (enrollmentType === 'PENDING') {
                    setCurrentPage(index + 1)
                  } else {
                    setCurrentPage(index + 1)
                  }
                }}
              />
            ),
          )}
        </div>
      </div>
    </section >
  )
}

export { EnrollmentsTable }
