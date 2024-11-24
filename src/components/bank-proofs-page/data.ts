const TRANSACTION_VIEW_OPTIONS = [
  {
    id: 0,
    content: "TODOS",
    transactionType: 'ALL',
    used: null
  },
  {
    id: 1,
    content: "VÁLIDOS",
    transactionType: 'VALID',
    used: null
  },
  {
    id: 2,
    content: "USADOS",
    transactionType: 'USED',
    used: true
  },
]


const initialValues = {
  enrollmentId: '',
  searchType: 'enrollmentId',
  currentTransactionType: 'ALL'
}

const TableHeaders = [
  { id: 0, label: 'Status'},
  { id: 1, label: 'Quantia' },
  { id: 2, label: 'Estudante'},
  { id: 3, label: 'Funcionário' },
  { id: 4, label: 'Número do Comprovativo'},
  { id: 5, label: 'Id do Pagamento'},
  { id: 6, label: 'Data'},
  { id: 7, label: 'Hora'},
];


export { TRANSACTION_VIEW_OPTIONS, initialValues, TableHeaders }
