interface StudentDetails {
  id: number
  dateOfBirth: string
  gender: 'MALE' | 'FEMALE'
  height: number
  identityCardNumber: string
  fullName: string
  countyId: number
  alternativePhone: string
  emissionDate: string
  expirationDate: string
  father: string
  files: any[]
  maritalStatus: 'SINGLE' | 'MARRIED' | 'DIVORCED'
  mother: string
  phone: string
  provinceId: number
  residence: string
  type: 'SCHOLARSHIP' | 'REGULAR'
}

interface Level {
  id: number
  name: string
}

interface Course {
  id: number
  name: string
}

interface IEnrollments {
  id: number
  docsState: 'PENDING' | 'APPROVED' | 'REJECTED'
  paymentState: 'PENDING' | 'COMPLETED' | 'FAILED'
  identityCardNumber: string
  levelId: number
  courseId: number
  classeId: number | null
  created_at: string
  update_at: string
  students: StudentDetails
  levels: Level
  courses: Course
  documents: any[]
}

export type { IEnrollments }
