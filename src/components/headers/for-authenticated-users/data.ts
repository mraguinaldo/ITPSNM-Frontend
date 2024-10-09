import { BookBookmark, CirclesFour, Clock, CurrencyDollar, Lock, Scroll, SignOut } from 'phosphor-react'

const STTUDENT_OPTIONS = [
  {
    id: 0,
    content: 'Painel',
    href: '/aluno/painel',
    Icon: CirclesFour,
  },
  {
    id: 1,
    content: 'Senha',
    href: '',
    Icon: Lock,
  },
  {
    id: 2,
    content: 'Notas',
    Icon: Scroll,
    href: '/aluno/painel/relatorio-de-notas',
  },
  {
    id: 3,
    content: 'Pagamentos',
    Icon: CurrencyDollar,
    href: '/aluno/painel',
  },
  {
    id: 4,
    content: 'Horários',
    Icon: Clock,
    href: '/aluno/painel',
  },
  {
    id: 5,
    content: 'Documentos',
    Icon: BookBookmark,
    href: '/aluno/painel',
  },
  {
    id: 6,
    content: 'Terminar sessão',
    href: '/login',
    Icon: SignOut,
  },
]

export { STTUDENT_OPTIONS }
