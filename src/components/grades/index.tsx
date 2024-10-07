import { Header } from './header'
import { useContext, useEffect } from 'react'

import { TableContent } from './table'
import { UseFetchNotes } from '../../hooks/useFetchNotes'
import { ApplicationContexts } from '../contexts/applicationContexts'
import { useQueryClient } from 'react-query'

const Grades = () => {
  const { mutate: fetchNotes, data: notes, isLoading, error } = UseFetchNotes()
  const { selectedLevel }: any = useContext(ApplicationContexts)
  const queryClient = useQueryClient()
  const user: any = queryClient.getQueryData(['studentData'])

  useEffect(() => {
    const handleFetchNotes = (enrollmentId: number, level: string) => {
      const userData = { enrollmentId, level }
      fetchNotes({ userData })
    }
    if (!user) {
      console.log('Usuário não encontrado...')
    } else if (user && selectedLevel) {
      handleFetchNotes(user.enrollment.id, selectedLevel.level)
    }
  }, [selectedLevel, user, fetchNotes])

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
