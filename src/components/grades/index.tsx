import { Header } from './header'
import { useContext, useEffect, useState } from 'react'

import { TableContent } from './table'
import { UseFetchNotes } from '../../hooks/useFetchNotes'
import { ApplicationContexts } from '../contexts/applicationContexts'
import { useQueryClient } from 'react-query'
import { Button } from '../button'

const Grades = () => {
  const { mutate: fetchNotes, data: notes, isLoading, error } = UseFetchNotes()
  const { selectedLevel }: any = useContext(ApplicationContexts)
  const [showGrades, setShowGrades] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const user: any = queryClient.getQueryData(['studentData'])

  const handleFetchNotes = (enrollmentId: number, level: string) => {
    const userData = { enrollmentId, level }
    fetchNotes({ userData })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    user && handleFetchNotes(user?.enrollment?.id, selectedLevel?.level)
  }, [selectedLevel, user])

  useEffect(() => {
    if (error || !user) setShowGrades(false)
  }, [error, user])

  return (
    <section id='grade_report' className="pt-40 bg-white lg:bg-transparent">
      <div className="w-full max-w-[1296px] flex flex-col gap-9 m-auto px-6 lg:p-11 lg:rounded-[16px] items-center pb-4 bg-white">
        <Header user={user} elementId='grade_report' />
        {showGrades ? (
          <TableContent notes={notes} error={error} isLoading={isLoading} />
        ) : (
          <div className="flex items-center justify-center w-full sm:max-w-[280px] h-[280px]">
            <Button
              type="button"
              content="Mostrar notas"
              onClick={() => {
                handleFetchNotes(user?.enrollment?.id, selectedLevel?.level)
                setShowGrades(true)
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export { Grades }
