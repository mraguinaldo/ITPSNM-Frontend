const tableHeader = [
  {
    id: 0,
    content: '',
  },
  {
    id: 1,
    content: 'Nº da fatura',
  },
  {
    id: 2,
    content: 'Nome do estudante',
  },
  {
    id: 3,
    content: 'Número do estudante',
  },
  {
    id: 4,
    content: 'Funcionário',
  },
  {
    id: 5,
    content: 'Tipo de pagamento',
  },
  {
    id: 6,
    content: 'Estado da fatura',
  },
  {
    id: 7,
    content: 'Quantia total',
  }
]

const INVOICE_VIEW_OPTIONS = [
  {
    id: 1,
    content: "PENDENTES",
    invoiceType: 'PENDING'
  },
  {
    id: 2,
    content: "APROVADAS",
    invoiceType: 'PAID'
  },
]

export { tableHeader, INVOICE_VIEW_OPTIONS }
