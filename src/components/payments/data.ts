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
  paymentsState: false,
  paymentId: undefined,
  employeeId: undefined
}


const PAYMENT_VIEW_OPTIONS = [
  {
    id: 0,
    content: "Todos",
    paymentType: 'ALL'
  },
  {
    id: 1,
    content: "PENDENTES",
    paymentType: 'PENDING'
  },
  {
    id: 2,
    content: "APROVADOS",
    paymentType: 'PAID'
  },
]


export { initialValues, roles, PAYMENT_VIEW_OPTIONS }
