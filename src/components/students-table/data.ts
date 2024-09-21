interface PropsType {
  id: number
  name: string
  img: string
  course: string
  level: string
  state: boolean
}

export const STUDENTS: PropsType[] = [
  {
    id: 0,
    name: 'Daniel Gustavo Yanvua',
    img: '/men-00.png',
    course: 'Farmácia',
    level: '10ª',
    state: true,
  },
  {
    id: 1,
    name: 'Catarino Ribeiro',
    img: '/men-00.png',
    course: 'Enfermagem',
    level: '10ª',
    state: false,
  },
  {
    id: 2,
    name: 'Agostinho Mafuco César Cambriz',
    img: '/men-00.png',
    course: 'Análises Clínica',
    level: '10ª',
    state: true,
  },
  {
    id: 3,
    name: 'João Rodrigues Tembo',
    img: '/men-00.png',
    course: 'Enfermagem',
    level: '10ª',
    state: false,
  },
  {
    id: 4,
    name: 'Aristides Gongo',
    img: '/men-00.png',
    course: 'Farmácia',
    level: '10ª',
    state: true,
  },
  {
    id: 5,
    name: 'José João',
    img: '/men-00.png',
    course: 'Fisioterapia',
    level: '10ª',
    state: true,
  },
]

interface PropsTypeTableHeader {
  id: number
  content: string
}

export const tableHeader: PropsTypeTableHeader[] = [
  {
    id: 0,
    content: 'Nome',
  },
  {
    id: 1,
    content: 'Classe',
  },
  {
    id: 2,
    content: 'Curso',
  },
  {
    id: 3,
    content: 'Estado',
  },
  {
    id: 4,
    content: 'Ações',
  },
]

export const STUDENT_DATA = {
  dateOfBirth: '12-02-2000',
  emissionDate: '12-03-1923',
  expirationDate: '12-02-3222',
  fullName: 'Agostinho Mafuco César Cambriz',
  father: 'Mafuco Cahamba Cambriz',
  mother: 'Antonica César Sati',
  county: 'Cacuaco',
  province: 'Bengo',
  height: '1.93',
  identityCardNumber: '093293892LA098',
  gender: 'Masculino',
  maritalStatus: 'Casado(a)',
  natural: 'Luanda',
  residence: 'Cacuaco',
  email: 'cesaraguinaldo23@gmail.com',
  phone: '949488367',
  alternativePhone: '933788324',
  course: 'Fisioterapia',
  level: '12ª Classe',
}
