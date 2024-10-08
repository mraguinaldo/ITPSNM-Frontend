import { useNavigate } from 'react-router-dom'
import { UseFetchEnrollmentsApproved } from '../../hooks/useFetchEnrollmentsApproved'
import { DataTableHeader } from './header'
import { Students } from './table'
import { useEffect, useState } from 'react'

const StudentsTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const redirectTo = useNavigate()
  const {
    data: enrollmentsApproved,
    error: errorWhenGettingApprovedEnrollments,
    isLoading,
    refetch,
  }: any = UseFetchEnrollmentsApproved(currentPage)
  const messageError = 'Unauthorized: Invalid token'

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (currentPage) refetch()
  }, [currentPage])

  useEffect(() => {
    if (errorWhenGettingApprovedEnrollments?.response?.data?.message === messageError) {
      redirectTo('/login')
    }
  }, [errorWhenGettingApprovedEnrollments, redirectTo])

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
            <button
              type="button"
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-lg px-4 py-2 flex items-center justify-center ${currentPage === index + 1 ? 'bg-[#d8a429a9] font-semibold' : 'bg-[#b7b7b73b]'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export { StudentsTable }
