import { Header } from './header'
import { useContext, useEffect, useCallback } from 'react'

import { TableContent } from './table'
import { UseFetchNotes } from '../../hooks/useFetchNotes'
import { ApplicationContexts } from '../contexts/applicationContexts'
import { UsePickUpAuthenticatedStudent } from '../../hooks/usePickUpAuthenticatedStudent'

const Grades = () => {
  const user = UsePickUpAuthenticatedStudent()

  const { mutate: fetchNotes, data: notes, isLoading, error } = UseFetchNotes()
  const { selectedLevel }: any = useContext(ApplicationContexts)

  const handleFetchNotes = useCallback(
    (enrollmentId: number, level: string) => {
      const userData = { enrollmentId, level }
      fetchNotes({ userData })
    },
    [fetchNotes],
  )

  useEffect(() => {
    if (user && selectedLevel) {
      handleFetchNotes(user.id, selectedLevel.level)
    }
  }, [handleFetchNotes, selectedLevel, user])

  if (!user) {
    return (
      <h1 className="text=[24px] md:text-[32px] font-semibold justify-center flex items-center h-dvh">
        Buscando Informações...
      </h1>
    )
  }

  return (
    <section id="grade_report" className="pt-40 lg:px-6 bg-white lg:bg-transparent">
      <div className="w-full max-w-[1296px] flex flex-col gap-9 m-auto p-6 lg:p-11 lg:rounded-[16px] bg-white">
        <Header user={user} />
        <TableContent notes={notes} error={error} isLoading={isLoading} />
      </div>
    </section>
  )
}

export { Grades }
