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
    content: 'Residência',
  },
  {
    id: 3,
    content: 'Género',
  },
  {
    id: 4,
    content: 'Estado civil',
  },
  {
    id: 5,
    content: 'Nº do Bilhete de Identidade',
  },
  {
    id: 6,
    content: 'Data de nascimento',
  },
  {
    id: 7,
    content: 'Data de emissão do BI',
  },
  {
    id: 8,
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
