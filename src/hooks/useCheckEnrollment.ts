import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import { useNavigate } from 'react-router-dom'

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
  alternativePhone: string
  dateOfBirth: any
  emissionDate: any
  gender: string
  height: any
  identityCardNumber: string
  maritalStatus: string
  mother: string
  father: string
  residence: string
  phone: string
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
  const redirectTo = useNavigate()

  return useMutation<IEnrollments, Error, URLSearchParams>(
    async (searchParams: URLSearchParams) => {
      const response = await API.get(`/enrollments?${searchParams.toString()}`)
      return response.data as IEnrollments
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['studentData'], data)
      },
      onError: (error: any) => {
        if (error.response.data.message === 'Unauthorized: Invalid token') {
          redirectTo('/login')
        }
      },
    },
  )
}

export { UseCheckEnrollment }
