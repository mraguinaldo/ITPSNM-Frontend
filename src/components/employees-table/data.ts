const tableHeader = [
  {
    id: 0,
    content: 'Nome',
  },
  {
    id: 1,
    content: 'Telefone',
  },
  {
    id: 2,
    content: 'Telefone alternativo',
  },
  {
    id: 3,
    content: 'Residência',
  },
  {
    id: 4,
    content: 'Género',
  },
  {
    id: 5,
    content: 'Estado civil',
  },
  {
    id: 6,
    content: 'Nº do Bilhete de Identidade',
  },
  {
    id: 7,
    content: 'Data de nascimento',
  },
  {
    id: 8,
    content: 'Data de emissão do BI',
  },
  {
    id: 9,
    content: 'Data de expiração do BI',
  },
]

const initialValues = {
  chevronState: 100,
  modalState: 100,
  genderId: 0,
  maritalStatus: '',
  province: '',
  county: '',
  signupFormStatus: false,
  defaultModalState: false,
}

const fields = [
  'fullName',
  'father',
  'mother',
  'countyId',
  'provinceId',
  'height',
  'identityCardNumber',
  'gender',
  'maritalStatus',
  'natural',
  'residence',
  'phone',
  'alternativePhone',
]

const dateFields = ['dateOfBirth', 'emissionDate', 'expirationDate']

const MARITAL_STATUS = [
  { id: 0, content: 'Solteir', maritalStatus: 'SINGLE' },
  { id: 1, content: 'Casad', maritalStatus: 'MARRIED' },
  { id: 2, content: 'Divorcíad', maritalStatus: 'DIVORCED' },
  { id: 3, content: 'Viúv', maritalStatus: 'WIDOWED' },
]

const GENRES = [
  { id: 0, content: 'Masculino', gender: 'MALE' },
  { id: 1, content: 'Feminino', gender: 'FEMALE' },
]

export { tableHeader, GENRES, MARITAL_STATUS, dateFields, fields, initialValues }
