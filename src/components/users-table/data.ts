const tableHeader = [
  {
    id: 0,
    content: 'Nome',
  },
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
    content: 'Estado da conta',
  },
  {
    id: 4,
    content: 'Tentativas de login',
  },
  {
    id: 5,
    content: 'Estado',
  },
  {
    id: 6,
    content: 'Senha',
  },
]

const ROLES = [
  { id: 0, role: 'STUDENT', content: 'Estudante' },
  { id: 1, role: 'ADMIN', content: 'Administrador' },
  { id: 2, role: 'TEACHER', content: 'Professor' },
  { id: 3, role: 'EMPLOYEE', content: 'Funcionário' },
]
const initialValues = {
  currentRole: { role: 'STUDENT', content: 'Estudante' },
  modalState: false,
  signupFormStatus: false,
  currentEmail: '',
}
export { tableHeader, ROLES, initialValues }
