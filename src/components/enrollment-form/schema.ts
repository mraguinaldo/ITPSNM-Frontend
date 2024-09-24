import * as yup from 'yup'

export const schemaForm = yup.object().shape({
  identityCardNumber: yup
    .string()
    .required('O número do bilhete é obrigatório')
    .min(12, 'O número do bilhete deve ter no minimo 12 caracteres')
    .max(14, 'O número do bilhete deve ter no máximo 14 caracteres'),
  levelId: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .required('A classe é obrigatório'),
  courseId: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .required('O curso é obrigatório'),
})
