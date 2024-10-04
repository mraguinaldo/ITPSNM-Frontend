const initialValues = {
  chevronState: 100,
  modalState: 100,
  genderId: 0,
  maritalStatus: '',
  province: '',
  county: '',
  signupFormStatus: false,
}

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
const fields: any = [
  'fullName',
  'phone',
  'gender',
  'residence',
  'maritalStatus',
  'identityCardNumber',
  'alternativePhone',
]

export { GENRES, MARITAL_STATUS, dateFields, fields, initialValues }
