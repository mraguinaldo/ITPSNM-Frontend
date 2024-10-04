import * as yup from 'yup'

export const schemaForm = yup.object().shape({
  fullName: yup.string().required('O nome completo é obrigatório!!').min(2, 'Nome inválido'),
  identityCardNumber: yup
    .string()
    .required('O número do bilhete é obrigatório')
    .min(12, 'O número do bilhete deve ter no minimo 12 caracteres')
    .max(14, 'O número do bilhete deve ter no máximo 14 caracteres'),
  residence: yup
    .string()
    .required('A residência é obrigratório')
    .min(5, 'A residência deve ter no mínimo 5 letras')
    .test('residence-validation', 'Endereço inválido', (residence) => {
      const regEx = /^[A-ZÁ-Ú][a-zá-ú]{1,12}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?$/
      if (residence.match(regEx)) return true
    }),
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

  dateOfBirth: yup.date().required('A data de nascimento é obrigatório').typeError('A data deve ser verdadeira'),
  emissionDate: yup.date().required('A data de emissão é obrigatório').typeError('A data deve ser verdadeira'),
  expirationDate: yup.date().required('A data de validade é obrigatório').typeError('A data deve ser verdadeira'),
})
