import { useMutation } from 'react-query'
import { API } from '../services/api'

interface Subject {
  id: number
  name: string
  created_at: string
  update_at: string
}

interface Note {
  id: number
  pf1: number
  pf2: number
  pft: number
  ps1: number
  ps2: number
  pst: number
  pt1: number
  pt2: number
  ptt: number
  nee: number
  mt1: number
  mt2: number
  mt3: number
  mf: number
  resource: number
  mfd: number
  level: string
  created_at: string
  update_at: string
  subjectId: number
  enrollmentId: number
  subjects: Subject
}

interface NotesResponse {
  notes: Note[]
}

const UseFetchNotes = () => {
  return useMutation<NotesResponse, Error, any>({
    mutationFn: async ({ userData }: { userData: any }) => {
      const response = await API.get(`/notes/${userData?.enrollmentId}/grades?level=${userData?.level}`
      )
      const { notes }: any = response.data as NotesResponse
      return notes as NotesResponse
    },
  })
}

export { UseFetchNotes }
