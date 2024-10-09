import * as yup from 'yup'

export const schemaForm = yup.object().shape({
  fullName: yup
    .string()
    .required('O nome completo é obrigatório!!')
    .min(1, 'Nome inválido')
    .trim()
    .test('name-validation', 'Nome inválido', (name) => {
      const regEx =
        /^[A-ZÁ-Ú][a-zá-ú]{1,20}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?[ ]+[A-ZÁ-Ú][a-zá-ú]{1,20}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?$/
      if (name.match(regEx)) return true
    }),
  father: yup
    .string()
    .required('O nome do pai é obrigatório!!')
    .trim()
    .min(1, 'Nome inválido')
    .test('name-validation', 'Nome inválido', (name) => {
      const regEx =
        /^[A-ZÁ-Ú][a-zá-ú]{1,20}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?[ ]+[A-ZÁ-Ú][a-zá-ú]{1,20}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?$/
      if (name.match(regEx)) return true
    }),
  mother: yup
    .string()
    .required('O nome da mãe é obrigatório!!')
    .min(1, 'Nome inválido')
    .trim()
    .test('name-validation', 'Nome inválido', (name) => {
      const regEx =
        /^[A-ZÁ-Ú][a-zá-ú]{1,20}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?[ ]+[A-ZÁ-Ú][a-zá-ú]{1,20}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,20})?$/
      if (name.match(regEx)) return true
    }),
  identityCardNumber: yup
    .string()
    .required('O número do bilhete é obrigatório')
    .min(12, 'O número do bilhete deve ter no minimo 12 caracteres')
    .max(14, 'O número do bilhete deve ter no máximo 14 caracteres'),
  height: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .required('A altura é obrigatória')
    .min(1, 'A altura deve ser maior ou igual a 1')
    .max(5, 'A altura deve ser menor ou igual a 5'),
  residence: yup.string().required('A residência é obrigratório'),
  natural: yup.string().required('A naturalidade é obrigratório'),
  phone: yup
    .string()
    .required('O número de telefone é obrigatório!!')
    .test('phone-validation', 'Número de telefone inválido.', (phone) => {
      const phoneRegex = /^[9]+[0-9]{8}$/

      if (phone?.match(phoneRegex)) return true
    }),
  alternativePhone: yup.string().max(12),
  gender: yup.string().required('O gênero é obrigatório'),
  maritalStatus: yup.string().required('O estado civil é obrigatório'),
  provinceId: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .required('A província é obrigatório')
    .min(1),
  countyId: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .required('O município é obrigatório')
    .min(1),
  dateOfBirth: yup.date().required('A data de nascimento é obrigatório').typeError('A data deve ser verdadeira'),
  emissionDate: yup.date().required('A data de emissão é obrigatório').typeError('A data deve ser verdadeira'),
  expirationDate: yup.date().required('A data de validade é obrigatório').typeError('A data deve ser verdadeira'),
})
