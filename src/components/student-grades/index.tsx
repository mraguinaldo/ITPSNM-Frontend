import { useContext, useEffect, useState } from 'react'
import { TableContent } from '../grades/table'
import { UseFetchNotes } from '../../hooks/useFetchNotes'
import { MagnifyingGlass } from 'phosphor-react'
import { InputSearch } from '../inputs/search'
import { ApplicationContexts } from '../contexts/applicationContexts'
import { Button } from '../button'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import { Header } from '../grades/header'

const StudentGrades = () => {
  const { mutate: fetchNotes, data: notes, isLoading, error } = UseFetchNotes()
  const { mutate: useCheckEnrollment, data: student, isLoading:
    lookingForStudent, error: studentNotFound }: any = UseCheckEnrollment()
  const [enrollmentNumber, setEnrollmentNumber] = useState<string>('')

  const { selectedLevel }: any = useContext(ApplicationContexts)
  const [showGrades, setShowGrades] = useState<boolean>(false)

  const handleFetchNotes = (enrollmentId: number, level: string) => {
    const userData = { enrollmentId, level }
    fetchNotes({ userData })
    setShowGrades(true)
  }

  useEffect(() => {
    if (student) handleFetchNotes(student?.enrollment?.id, selectedLevel?.level)
  }, [selectedLevel])

  useEffect(() => {
    if (error || !student?.enrollment?.id) setShowGrades(false)
  }, [error, student])

  const fetchStudent = () => {
    const params = new URLSearchParams({
      [enrollmentNumber ? 'enrollmentNumber' : '']: enrollmentNumber || '',
    })
    useCheckEnrollment(params)
  }


  const searchStudent = (e: any) => {
    if (e.key === 'Enter') {
      fetchStudent()
    }
  }

  return (
    <div className={`w-full pl-6 py-16 lg:pt-11 lg:pb-32 lg:rounded-[16px] bg-white flex gap-6 flex-col ${student ? 'h-fit' : 'h-dvh'}`}>
      <div className='flex items-start sm:items-center w-full flex-wrap gap-4 justify-center sm:pr-3 pr-8'>
        <div id="search__area" className="flex flex-col items-center relative w-full">
          <InputSearch
            placeholder={'Insira o número de inscrição do aluno...'}
            className="flex-row-reverse"
            icon={
              <MagnifyingGlass
                id="search-icon"
                className="cursor-pointer p-1 hover:bg-slate-200 rounded-full flex items-center justify-center"
                color="#000000"
                size={24}
                onClick={fetchStudent}
              />
            }
            value={enrollmentNumber}
            onKeyDown={(e: any) => searchStudent(e)}
            onChange={(e: any) => setEnrollmentNumber(e.target.value)}
          />
        </div>
      </div>

      {lookingForStudent &&
        <h1 className="text-[24px] md:text-[32px] font-semibold w-full justify-center flex items-center h-[248px]">
          Buscando o estudante...
        </h1>
      }
      {studentNotFound &&
        <h1 className="text-[24px] md:text-[32px] font-semibold justify-center flex items-center h-[248px] w-full">
          Estudante não encontrado 😢
        </h1>
      }

      {student && <div id='grade_report_admin' className="w-full flex flex-col gap-9 items-center px-3 py-12 lg:py-4 bg-white">
        <Header user={student} elementId='grade_report_admin' />
        {showGrades ? (
          <TableContent notes={notes} error={error} isLoading={isLoading} />
        ) : (
          <div className="flex items-center justify-center w-full max-w-[280px] h-[280px]">
            <Button
              type="button"
              content="Mostrar notas"
              onClick={() => {
                handleFetchNotes(student?.enrollment?.id, selectedLevel?.level)
                setShowGrades(true)
              }}
            />
          </div>
        )}
      </div>}
    </div>
  )
}

export { StudentGrades }
