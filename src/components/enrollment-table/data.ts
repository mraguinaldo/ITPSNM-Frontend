import { Scroll, UserRectangle } from 'phosphor-react'

interface PropsTypeTableHeader {
  id: number
  content: string
}

const tableHeader: PropsTypeTableHeader[] = [
  {
    id: 0,
    content: 'Nome',
  },
  {
    id: 1,
    content: 'Classe',
  },
  {
    id: 2,
    content: 'Curso',
  },
  {
    id: 3,
    content: 'Estado da matrícula',
  },
  {
    id: 4,
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
    href: '/admin/dashboard/studant-data',
  },
]

const initialValues = {
  selectedStudent: '',
  studentStatus: '',
  modalStateForBlocking: false,
}

export { tableHeader, STUDENT_OPTIONS, initialValues }
