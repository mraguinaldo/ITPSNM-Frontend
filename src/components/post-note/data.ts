const quarters = [
  { id: 0, quarter: 'FIRST', content: 'Primeiro' },
  { id: 1, quarter: 'SECOND', content: 'Segundo' },
  { id: 2, quarter: 'THIRD', content: 'Terceiro' },
]

const Subjects = [
  { subjectId: 1, subject: 'Matemática' },
  { subjectId: 2, subject: 'Física' },
  { subjectId: 3, subject: 'Língua Portuguesa' },
  { subjectId: 4, subject: 'Geografia' },
  { subjectId: 5, subject: 'Análise De Dados' },
  { subjectId: 6, subject: 'Banco De Dados' },
  { subjectId: 7, subject: 'Matemática Discreta' },
]

const Levels = [
  { levelId: 1, level: 'CLASS_10', content: '10ª Classe' },
  { levelId: 2, level: 'CLASS_11', content: '11ª Classe' },
  { levelId: 3, level: 'CLASS_12', content: '12ª Classe' },
  { levelId: 4, level: 'CLASS_13', content: '13ª Classe' },
]

const initialValues = {
  quarter: '',
  subject: undefined,
  level: '',
  p1: undefined,
  p2: undefined,
  pt: undefined,
  resource: undefined,
  nee: undefined,
  ims: undefined,
  county: '',
}

export { quarters, initialValues, Subjects, Levels }
