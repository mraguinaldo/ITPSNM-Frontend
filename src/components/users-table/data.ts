import { Pen } from 'phosphor-react'

const tableHeader = [
  // {
  //   id: 0,
  //   content: 'Nome',
  // },
  {
    id: 1,
    content: 'E-mail',
  },
  {
    id: 2,
    content: 'Tipo de usúario',
  },
  {
    id: 3,
    content: 'Tentativas de login',
  },
  {
    id: 4,
    content: 'Acesso ao sistema',
  },
  {
    id: 5,
    content: 'Senha',
  },
  {
    id: 6,
    content: 'Ações',
  },
]

const ROLES = [
  { id: 0, role: 'STUDENT', content: 'Estudantes' },
  { id: 1, role: 'ADMIN', content: 'Administradores' },
  { id: 2, role: 'TEACHER', content: 'Professores' },
  { id: 3, role: 'EMPLOYEE', content: 'Funcionários' },
]
const initialValues = {
  currentRole: { role: 'STUDENT', content: 'Estudantes' },
  modalState: false,
  signupFormStatus: false,
  currentEmail: '',
  selectedUser: '',
  modalStateToChangePassword: false,
}

const USER_OPTIONS = [
  {
    id: 0,
    option: 'Alterar senha',
    Icon: Pen,
    href: '',
  },
]

export { tableHeader, ROLES, initialValues, USER_OPTIONS }
