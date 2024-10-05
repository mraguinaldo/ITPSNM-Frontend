import { Book, GraduationCap, Scroll, ShieldCheck, Student, Users } from 'phosphor-react'
import type { INavigationLinks } from './interface'

const NAVIGATION_LINKS: INavigationLinks[] = [
  {
    id: 0,
    content: 'Estudantes',
    Icon: Student,
    href: '/admin/dashboard',
  },
  {
    id: 1,
    content: 'Funcionários',
    Icon: Users,
    href: '/admin/dashboard/employees-table',
  },
  {
    id: 2,
    content: 'Matrículas',
    Icon: Book,
    href: '/admin/dashboard/enrollments-table',
  },
  {
    id: 3,
    content: 'Cursos',
    Icon: GraduationCap,
    href: '/admin/dashboard/courses-table',
  },
  {
    id: 4,
    content: 'Pautas de estudante',
    Icon: Scroll,
    href: '/admin/dashboard/student-grades',
  },
  {
    id: 5,
    content: 'Usuários',
    Icon: ShieldCheck,
    href: '/admin/dashboard/users-table',
  },
]

export { NAVIGATION_LINKS }
