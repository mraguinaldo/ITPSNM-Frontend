const COURSES = [
  { id: 0, course: 'Enfermagem' },
  { id: 1, course: 'Análises Clínica' },
  { id: 2, course: 'Farmácia' },
  { id: 3, course: 'Fisioterapia' },
]

const initialValues = {
  chevronState: 100,
  modalState: 100,
  level: 0,
}

const LEVELS = [
  { id: 0, level: '10ª Classe' },
  { id: 1, level: '11ª Classe' },
  { id: 2, level: '12ª Classe' },
  { id: 3, level: '13ª Classe' },
]

const fields = ['fullName', 'course', 'level']

export { COURSES, initialValues, fields, LEVELS }
