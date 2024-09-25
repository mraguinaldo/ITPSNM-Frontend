import { Header } from './header'
import { useContext, useEffect } from 'react'

import { TableContent } from './table'
import { UseFetchNotes } from '../../hooks/useFetchNotes'
import { SelectedLevelContenxts } from '../contexts/selected-level-context'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'

const Grades = () => {
  const { mutate: useFetchNotes, data: notes, isLoading, error } = UseFetchNotes()
  const { mutate: useCheckEnrollment, data: user } = UseCheckEnrollment()

  const { selectedLevel, enrollmentNumber }: any = useContext(SelectedLevelContenxts)

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        [enrollmentNumber && 'enrollmentNumber']: enrollmentNumber?.id,
      })
      useCheckEnrollment(params)
    }

    fetchData()
  }, [useCheckEnrollment, enrollmentNumber])

  useEffect(() => {
    const fetchNotes = async (enrollmentId: number, level: string) => {
      const userData = { enrollmentId, level }
      useFetchNotes({ userData })
    }

    fetchNotes(enrollmentNumber?.id, selectedLevel?.level)
  }, [useFetchNotes, selectedLevel, enrollmentNumber])

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
        <Header user={user} details={[]} />
        <TableContent notes={notes} error={error} isLoading={isLoading} />
      </div>
    </section>
  )
}

export { Grades }
