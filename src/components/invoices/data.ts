const initialValues = {
  chevronState: 100,
  modalState: 100,
  role: undefined,
  showPassword: false,
  status: 'Selecionar o tipo de pagamento',
  invoicesState: false
}

const ITEMS = [
  { id: 0, description: 'Declaração com notas', amount: 2000, checked: true },
  { id: 1, description: 'Declaração sem notas', amount: 12000, checked: true },
]


export { initialValues, ITEMS }
