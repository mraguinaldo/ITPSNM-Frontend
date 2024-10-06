const initialValues = {
  chevronState: 100,
  modalState: 100,
  gender: 0,
  maritalStatus: '',
  province: '',
  county: '',
  REPORT_CARD: 'Carregue a sua declaração ou certificado',
  IDENTITY_CARD: 'Carregue o seu bilhete de identidade',
  PHOTO: 'Carregue a sua foto',
  editStudent: false,
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

export { initialValues, fields, dateFields, MARITAL_STATUS, GENRES }
