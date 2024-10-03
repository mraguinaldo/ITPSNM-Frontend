import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'

interface Course {
  id: number
  name: string
}

interface Level {
  id: number
  name: string
}

interface Student {
  fullName: string
  id: number
  type: string
}

interface Enrollment {
  classeId: number | null
  courseId: number
  courses: Course
  created_at: string
  docsState: 'PENDING' | 'APPROVED'
  id: number
  identityCardNumber: string
  levelId: number
  levels: Level
  paymentState: 'PENDING' | 'APPROVED'
  students: Student
  update_at: string
}

interface IEnrollments {
  enrollment: Enrollment
}

const UseCheckEnrollment = () => {
  const queryClient = useQueryClient()

  return useMutation<IEnrollments, Error, URLSearchParams>(
    async (searchParams: URLSearchParams) => {
      const response = await API.get(`/enrollments?${searchParams.toString()}`)
      return response.data as IEnrollments
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['userData'], data)
      },
      onError: (error) => {
        console.error('Erro:', error)
      },
    },
  )
}

export { UseCheckEnrollment }
