import * as yup from 'yup'

export const schemaForm = yup.object().shape({
  fullName: yup.string().min(1, 'Nome inválido'),
  father: yup.string().min(1, 'Nome inválido'),
  mother: yup.string().min(1, 'Nome inválido'),
  identityCardNumber: yup
    .string()
    .min(12, 'O número do bilhete deve ter no minimo 12 caracteres')
    .max(14, 'O número do bilhete deve ter no máximo 14 caracteres'),
  height: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .min(1, 'A altura deve ser maior ou igual a 1')
    .max(5, 'A altura deve ser menor ou igual a 5'),
  residence: yup.string(),
  phone: yup.string().test('phone-validation', 'Número de telefone inválido.', (phone) => {
    const phoneRegex = /^[9]+[0-9]{8}$/

    if (phone?.match(phoneRegex)) return true
  }),
  alternativePhone: yup.string().max(12),
  gender: yup.string(),
  maritalStatus: yup.string(),
  dateOfBirth: yup.date(),
  emissionDate: yup.date(),
  levelId: yup.number().transform((value, originalValue) => {
    return originalValue === '' ? undefined : value
  }),
  courseId: yup.number().transform((value, originalValue) => {
    return originalValue === '' ? undefined : value
  }),
  PHOTO: yup.mixed().nullable(),
  REPORT_CARD: yup.mixed().nullable(),
  IDENTITY_CARD: yup.mixed().nullable(),
})
