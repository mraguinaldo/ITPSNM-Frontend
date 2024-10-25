import { BookBookmark, Clock, CurrencyDollar, Lock, Scroll } from 'phosphor-react'
import type { INavigationLinks } from './interface'

const NAVIGATION_LINKS: INavigationLinks[] = [
  {
    id: 1,
    content: 'Notas',
    Icon: Scroll,
    href: '/aluno/painel/relatorio-de-notas',
  },
  {
    id: 2,
    content: 'Faturas',
    Icon: CurrencyDollar,
    href: '/aluno/painel/faturas',
  },
  {
    id: 3,
    content: 'Senha',
    Icon: Lock,
    href: '/aluno/painel/seguranca',
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
]

export { NAVIGATION_LINKS }
