const initialValues = {
  chevronState: 100,
  modalState: 100,
  role: undefined,
  showPassword: false,
  paymentType: 'Selecionar o tipo de pagamento',
  invoicesState: false,
  level: 1,
}

const ITEMS = [
  { id: 0, description: 'Declaração com notas', amount: 2000, checked: true },
  { id: 1, description: 'Declaração sem notas', amount: 12000, checked: true },
]
const LEVELS = [
  { id: 1, level: '10ª Classe' },
  { id: 2, level: '11ª Classe' },
  { id: 3, level: '12ª Classe' },
  { id: 4, level: '13ª Classe' },
]

const MONTHS = [
  { id: 1, name: "JANUARY", content: "Janeiro" },
  { id: 2, name: "FEBRUARY", content: "Fevereiro" },
  { id: 3, name: "MARCH", content: "Março" },
  { id: 4, name: "APRIL", content: "Abril" },
  { id: 5, name: "MAY", content: "Maio" },
  { id: 6, name: "JUNE", content: "Junho" },
  { id: 7, name: "JULY", content: "Julho" },
  { id: 8, name: "AUGUST", content: "Agosto" },
  { id: 9, name: "SEPTEMBER", content: "Setembro" },
  { id: 10, name: "OCTOBER", content: "Outubro" },
  { id: 11, name: "NOVEMBER", content: "Novembro" },
  { id: 12, name: "DECEMBER", content: "Dezembro" }
];


export { initialValues, ITEMS, LEVELS, MONTHS }
