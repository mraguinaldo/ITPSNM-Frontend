import { Lock, SignOut, User } from 'phosphor-react'

const STTUDENT_OPTIONS = [
  {
    id: 0,
    content: 'Perfil',
    href: '/student/grade-view-area',
    Icon: User,
  },
  {
    id: 1,
    content: 'Atualizar Senha',
    href: '',
    Icon: Lock,
  },
  {
    id: 2,
    content: 'Terminar sessão',
    href: '/login',
    Icon: SignOut,
  },
]

export { STTUDENT_OPTIONS }
