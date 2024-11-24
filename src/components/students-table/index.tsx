import { UseFetchEnrollmentsApproved } from '../../hooks/useFetchEnrollmentsApproved'
import { ButtonForPagination } from '../button-for-pagination'
import { DataTableHeader } from './header'
import { Students } from './table'
import { useEffect, useState } from 'react'

const StudentsTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const {
    data: enrollmentsApproved,
    isLoading,
    refetch,
  }: any = UseFetchEnrollmentsApproved(currentPage)

  useEffect(() => { currentPage && refetch() }, [currentPage])

  const totalStudents: any[] = enrollmentsApproved?.items?.filter((student: any) => student.students?.User)

  return (
    <section id="grade_report" className="bg-white lg:bg-black">
      <div className="w-full px-8 py-16 lg:p-11 lg:rounded-[16px] bg-white">
        <DataTableHeader totalStudents={totalStudents?.length || 0} students={enrollmentsApproved} />
        {isLoading ? (
          <h1 className="text=[24px] md:text-[32px] font-semibold justify-center flex items-center h-20">
            Buscando estudantes...
          </h1>
        ) : (
          <Students students={enrollmentsApproved} />
        )}
        <div className="flex gap-2 flex-wrap w-full">
          {Array.from({ length: enrollmentsApproved?.totalPages }, (_, index: number) => (
            <ButtonForPagination
              key={index}
              content={index + 1}
              isActive={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { StudentsTable }
