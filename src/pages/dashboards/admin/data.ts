import { Book, CreditCard, CurrencyDollar, GraduationCap, Receipt, Scroll, ShieldCheck, Stack, Student, Users } from 'phosphor-react'
import type { INavigationLinks } from './interface'

const NAVIGATION_LINKS: INavigationLinks[] = [
  {
    id: 0,
    content: 'Estudantes',
    Icon: Student,
    href: '/admin/painel',
  },
  {
    id: 1,
    content: 'Funcionários',
    Icon: Users,
    href: '/admin/painel/tabela-de-funcionarios',
  },
  {
    id: 2,
    content: 'Matrículas',
    Icon: Book,
    href: '/admin/painel/tabela-de-matriculas',
  },
  {
    id: 3,
    content: 'Cursos',
    Icon: GraduationCap,
    href: '/admin/painel/tabela-de-cursos',
  },
  {
    id: 4,
    content: 'Pautas de estudante',
    Icon: Scroll,
    href: '/admin/painel/pautas-de-alunos',
  },
  {
    id: 5,
    content: 'Usuários',
    Icon: ShieldCheck,
    href: '/admin/painel/tabela-de-usuarios',
  },
  {
    id: 6,
    content: 'Transações',
    Icon: CreditCard,
    href: '/admin/painel/transacoes',
  },
  {
    id: 7,
    content: 'Pagamentos',
    Icon: CurrencyDollar,
    href: '/admin/painel/pagamentos',
  },
  {
    id: 8,
    content: 'Faturas',
    Icon: Stack,
    href: '/admin/painel/faturas',
  },
  {
    id: 9,
    content: 'Comprovativos',
    Icon: Receipt,
    href: '/admin/painel/comprovativos',
  },
]

export { NAVIGATION_LINKS }
