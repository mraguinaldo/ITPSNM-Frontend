import { CircleDashed, Lock, Scroll, UserRectangle } from 'phosphor-react'

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
    content: 'Estado',
  },
  {
    id: 5,
    content: 'Ações',
  },
]

const STUDENT_OPTIONS = [
  {
    id: 0,
    option: 'Bloquear',
    Icon: Lock,
    href: '',
  },
  {
    id: 1,
    option: 'Lançar nota',
    Icon: Scroll,
    href: '/admin/painel/lancar-nota',
  },
  {
    id: 2,
    option: 'Mostrar dados',
    Icon: UserRectangle,
    href: '/admin/painel/dados-da-matricula',
  },
  {
    id: 3,
    option: 'Faturas',
    Icon: UserRectangle,
    href: '/admin/painel/aluno-faturas',
  },
  {
    id: 4,
    option: 'Confirmar estudante',
    Icon: CircleDashed,
  }
]

const LEVELS = [
  { id: 1, level: '10ª Classe' },
  { id: 2, level: '11ª Classe' },
  { id: 3, level: '12ª Classe' },
  { id: 4, level: '13ª Classe' },
]

const initialValues = {
  selectedStudent: '',
  studentStatus: '',
  modalStateForBlocking: false,
  modalStateToChangeLevel: false,
  currentLevelId: 0,
  enrollmentNumber: undefined
}

export { tableHeader, STUDENT_OPTIONS, initialValues, LEVELS }
