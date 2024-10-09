import { useNavigate } from 'react-router-dom'
import { DataTableHeader } from './header'
import { Students } from './table'
import { useEffect, useState } from 'react'
import { UseFetchEnrollments } from '../../hooks/useFetchEnrollments'
import { UseFetchEnrollmentsApproved } from '../../hooks/useFetchEnrollmentsApproved'

const EnrollmentsTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [enrollmentType, setEnrollmenType] = useState<string>('PENDING')
  const [students, setStudents] = useState<any>()
  const redirectTo = useNavigate()
  const {
    data: enrollmentsPending,
    error: errorWhenGettingPendingEnrollments,
    refetch: useFetchEnrollments,
  }: any = UseFetchEnrollments(currentPage)

  const messageError = 'Unauthorized: Invalid token'

  const {
    data: enrollmentsApproved,
    error: errorWhenGettingApprovedEnrollments,
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
    if (
      errorWhenGettingApprovedEnrollments?.response?.data?.message === messageError ||
      errorWhenGettingPendingEnrollments?.response?.data?.message === messageError
    ) {
      redirectTo('/login')
    }
  }, [errorWhenGettingApprovedEnrollments, redirectTo, errorWhenGettingPendingEnrollments])

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
          <button
            type="button"
            className={`text-[14px] uppercase border py-2 px-4 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc] ${enrollmentType === 'PENDING' ? 'border-[#dcdcdc]' : 'border-[#dcdcdc00]'}`}
            onClick={() => setEnrollmenType('PENDING')}
          >
            PENDENTES ( {enrollmentsPending?.items?.length} )
          </button>
          <button
            type="button"
            className={`text-[14px] uppercase border py-2 px-4 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc] ${enrollmentType === 'PENDING' ? 'border-[#dcdcdc00]' : 'border-[#dcdcdc]'}`}
            onClick={() => setEnrollmenType('APPROVED')}
          >
            Aprovadas ( {enrollmentsApproved?.items?.length} )
          </button>
        </div>
        {!enrollmentsPending || !enrollmentsApproved ? (
          <h1 className="text=[24px] md:text-[32px] font-semibold justify-center flex items-center h-20">
            Buscando matrículas...
          </h1>
        ) : (
          <Students students={students} />
        )}
        <div className="flex gap-2 flex-wrap w-full">
          {Array.from(
            { length: enrollmentType === 'PENDING' ? enrollmentsPending?.totalPages : enrollmentsApproved?.totalPages },
            (_, index: number) => (
              <button
                type="button"
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                onClick={() => {
                  if (enrollmentType === 'PENDING') {
                    setCurrentPage(index + 1)
                  } else {
                    setCurrentPage(index + 1)
                  }
                }}
                className={`rounded-lg px-4 py-2 flex items-center justify-center ${currentPage === index + 1 ? 'bg-[#d8a429a9] font-semibold' : 'bg-[#b7b7b73b]'}`}
              >
                {index + 1}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export { EnrollmentsTable }
