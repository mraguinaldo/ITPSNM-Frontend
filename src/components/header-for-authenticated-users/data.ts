import { User, UserSwitch } from 'phosphor-react'

const STTUDENT_OPTIONS = [
  {
    id: 0,
    content: 'Perfil',
    href: '/student/grade-view-area',
    Icon: User,
  },
  {
    id: 1,
    content: 'Terminar sessão',
    href: '/login',
    Icon: UserSwitch,
  },
]

export { STTUDENT_OPTIONS }
