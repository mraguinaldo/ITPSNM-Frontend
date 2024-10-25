const STATUS = [
  { id: 0, status: 'PAID', content: 'Pago' },
  { id: 1, status: 'PENDING', content: 'Pendente' },
  { id: 2, status: 'RECUSED', content: 'Recusado' },
]

const initialValues = {
  chevronState: 100,
  modalState: 100,
  role: undefined,
  showPassword: false,
  status: 'Escolha o estado da fatura',
  invoicesState: false
}

const ITEMS = [
  { id: 0, description: 'Declaração com notas', amount: 2000, checked: true },
  { id: 1, description: 'Declaração sem notas', amount: 12000, checked: true },
]


export { initialValues, STATUS, ITEMS }
