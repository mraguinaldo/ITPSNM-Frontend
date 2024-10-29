const roles = [
  { id: 0, role: 'ADMIN', content: 'Administrador' },
  { id: 1, role: 'TEACHER', content: 'Professor' },
  { id: 2, role: 'STUDENT', content: 'Estudante' },
]

const initialValues = {
  chevronState: 100,
  modalState: 100,
  role: undefined,
  showPassword: false,
}

export { initialValues, roles }
