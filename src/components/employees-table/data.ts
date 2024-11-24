import { Pen, Trash } from "phosphor-react"

const tableHeader = [
  {
    id: 0,
    content: 'Nº',
  },
  {
    id: 1,
    content: 'Nome',
  },
  {
    id: 2,
    content: 'Telefone',
  },
  {
    id: 3,
    content: 'Telefone alternativo',
  },
  {
    id: 4,
    content: 'Residência',
  },
  {
    id: 5,
    content: 'Género',
  },
  {
    id: 6,
    content: 'Estado civil',
  },
  {
    id: 7,
    content: 'Nº do Bilhete de Identidade',
  },
  {
    id: 8,
    content: 'Data de nascimento',
  },
  {
    id: 9,
    content: 'Data de emissão do BI',
  },
  {
    id: 10,
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

const OPTIONS_FOR_EMPLOYEES = [
  {
    id: 0, 
    content: 'Editar funcionário',
    href: '/admin/painel/editar-funcionario', 
    Icon: Pen, 
  },
  {id: 1, href: '', Icon: Trash, content: 'Eliminar funcionário'},
]

export { 
  GENRES, 
  fields, 
  dateFields, 
  tableHeader, 
  initialValues, 
  MARITAL_STATUS, 
  OPTIONS_FOR_EMPLOYEES 
}
