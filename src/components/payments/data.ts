import { Scroll } from "phosphor-react"

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
  employeeId: undefined,
  
  enrollmentNumber: undefined,
  currentPaymentType: 'ALL',
  paymentId: 0,
  showModal: 0,
  invoiceId: 0
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

const PAYMENT_OPTIONS = [
  {
    id: 1,
    option: 'Exibir fatura',
    Icon: Scroll,
  },
  {
    id: 2,
    option: 'Acrescentar valores',
    Icon: Scroll,
  },
  {
    id: 3,
    option: 'Aprovar pagamento',
    Icon: Scroll,
  },
]


export { initialValues, roles, PAYMENT_VIEW_OPTIONS, PAYMENT_OPTIONS }
