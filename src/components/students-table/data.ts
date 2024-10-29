import { Lock, Scroll, UserRectangle } from 'phosphor-react'

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
    option: 'Pagamentos',
    Icon: UserRectangle,
    href: '/admin/painel/aluno-pagamentos',
  },
]

const initialValues = {
  selectedStudent: '',
  studentStatus: '',
  modalStateForBlocking: false,
}

export { tableHeader, STUDENT_OPTIONS, initialValues }
