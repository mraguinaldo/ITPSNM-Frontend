import { Lock, Scroll, UserRectangle } from 'phosphor-react'

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
    content: 'Estado',
  },
  {
    id: 4,
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
    href: '/admin/dashboard/post-note',
  },
  {
    id: 2,
    option: 'Mostrar dados',
    Icon: UserRectangle,
    href: '/admin/dashboard/studant-data',
  },
]

export { tableHeader, STUDENT_OPTIONS }
