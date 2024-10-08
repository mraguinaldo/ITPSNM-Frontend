import { Scroll, UserRectangle } from 'phosphor-react'

interface PropsTypeTableHeader {
  id: number
  content: string
}

const tableHeader: PropsTypeTableHeader[] = [
  {
    id: 0,
    content: 'Nº',
  },
  {
    id: 1,
    content: 'Nome',
  },
  {
    id: 2,
    content: 'Classe',
  },
  {
    id: 3,
    content: 'Curso',
  },
  {
    id: 4,
    content: 'Estado da matrícula',
  },
  {
    id: 5,
    content: 'Ações',
  },
]

const STUDENT_OPTIONS = [
  {
    id: 1,
    option: 'Confirmar matrícula',
    Icon: Scroll,
  },
  {
    id: 2,
    option: 'Mostrar dados',
    Icon: UserRectangle,
    href: '/admin/painel/dados-da-matricula',
  },
]

const initialValues = {
  selectedStudent: '',
  studentStatus: '',
  modalStatusToConfirmEnrollment: false,
  courseId: undefined,
  levelId: undefined,
  enrollmentId: undefined,
}

export { tableHeader, STUDENT_OPTIONS, initialValues }
