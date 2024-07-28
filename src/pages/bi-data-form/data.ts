const PROVINCES = [
  { id: 0, province: 'Luanda' },
  { id: 1, province: 'Bengo' },
  { id: 2, province: 'Malanje' },
  { id: 3, province: 'Benguela' },
  { id: 4, province: 'Kwanza Norte' },
  { id: 5, province: 'Huíla' },
  { id: 6, province: 'Zaire' },
]

const COUNTIES = [
  { id: 0, county: 'Talatona' },
  { id: 1, county: 'Viana' },
  { id: 2, county: 'Cacuaco' },
  { id: 3, county: 'Belas' },
  { id: 4, county: 'Kilamba Kiaxi' },
  { id: 5, county: 'Cazenga' },
  { id: 6, county: 'Icolo-e-Bengo' },
  { id: 7, county: 'Luanda' },
]

const initialValues = {
  chevronState: 100,
  modalState: 100,
  gender: 0,
  maritalStatus: 0,
  province: '',
  county: '',
}

const fields = [
  'fullName',
  'father',
  'mother',
  'county',
  'province',
  'height',
  'identityCardNumber',
  'gender',
  'maritalStatus',
  'natural',
  'residence',
  'email',
  'phone',
  'alternativePhone',
]

const dateFields = ['dateOfBirth', 'emissionDate', 'expirationDate']

const MARITAL_STATUS = [
  { id: 0, maritalStatus: 'Solteiro(a)' },
  { id: 1, maritalStatus: 'Casado(a)' },
  { id: 2, maritalStatus: 'Divorcíado(a)' },
  { id: 3, maritalStatus: 'Viúvo(a)' },
]

const GENRES = [
  { id: 0, gender: 'Masculino' },
  { id: 1, gender: 'Feminino' },
]

export { PROVINCES, COUNTIES, initialValues, fields, dateFields, MARITAL_STATUS, GENRES }
