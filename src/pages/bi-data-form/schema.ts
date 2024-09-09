import * as yup from 'yup'

export const schemaForm = yup.object().shape({
  fullName: yup
    .string()
    .required('O nome completo é obrigatório!!')
    .min(1, 'Nome inválido')
    .test('name-validation', 'Nome inválido', (name) => {
      const regEx =
        /^[A-ZÁ-Ú][a-zá-ú]{1,12}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?[ ]+[A-ZÁ-Ú][a-zá-ú]{1,12}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?$/
      if (name.match(regEx)) return true
    }),
  father: yup
    .string()
    .required('O nome do pai é obrigatório!!')
    .min(1, 'Nome inválido')
    .test('name-validation', 'Nome inválido', (name) => {
      const regEx =
        /^[A-ZÁ-Ú][a-zá-ú]{1,12}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?[ ]+[A-ZÁ-Ú][a-zá-ú]{1,12}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?$/
      if (name.match(regEx)) return true
    }),
  mother: yup
    .string()
    .required('O nome da mãe é obrigatório!!')
    .min(1, 'Nome inválido')
    .test('name-validation', 'Nome inválido', (name) => {
      const regEx =
        /^[A-ZÁ-Ú][a-zá-ú]{1,12}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?[ ]+[A-ZÁ-Ú][a-zá-ú]{1,12}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?$/
      if (name.match(regEx)) return true
    }),
  identityCardNumber: yup
    .string()
    .required('O número do bilhete é obrigatório')
    .min(12, 'O número do bilhete deve ter no minimo 12 caracteres')
    .max(14, 'O número do bilhete deve ter no máximo 14 caracteres')
    .test('identity-card-number-validation', 'Número do bilhete inválido', (identityCardNumber) => {
      const regEx = /^\d{7,9}[A-Z]{2}\d{3}$/

      if (identityCardNumber.match(regEx)) return true
    }),
  height: yup
    .string()
    .required('A altura é obrigatória')
    .matches(/^\d{1,2}\.\d{2,3}$/, 'Ex: 1.75'),
  residence: yup
    .string()
    .required('A residência é obrigratório')
    .min(5, 'A residência deve ter no mínimo 5 letras')
    .test('residence-validation', 'Endereço inválido', (residence) => {
      const regEx = /^[A-ZÁ-Ú][a-zá-ú]{1,12}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?$/
      if (residence.match(regEx)) return true
    }),
  natural: yup
    .string()
    .required('A naturalidade é obrigratório')
    .min(4, 'Deve ter no mínimo 4 letras')
    .test('natural-validation', 'Naturalidade inválida', (natural) => {
      const regEx = /^[A-ZÁ-Ú][a-zá-ú]{1,12}([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?([ ]+[A-ZÁ-Ú][a-zá-ú]{1,12})?$/
      if (natural.match(regEx)) return true
    }),
  email: yup
    .string()
    .required('O email é obrigatório!!')
    .test('email-validation', 'Email inválido.', (email) => {
      const emailRegex =
        /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/
      if (email?.match(emailRegex)) return true
    }),
  phone: yup
    .string()
    .required('O número de telefone é obrigatório!!')
    .test('phone-validation', 'Número de telefone inválido.', (phone) => {
      const phoneRegex = /^[9]+[0-9]{8}$/

      if (phone?.match(phoneRegex)) return true
    }),
  alternativePhone: yup.string().test('phone-validation', 'Número de telefone inválido.', (phone) => {
    const phoneRegex = /^[9]+[0-9]{8}$/

    if (phone?.match(phoneRegex)) return true
  }),
  gender: yup.string().required('O gênero é obrigatório'),
  maritalStatus: yup.string().required('O estado civil é obrigatório'),
  province: yup.string().required('A província é obrigatório'),
  county: yup.string().required('O município é obrigatório'),
  dateOfBirth: yup.date().required('A data de nascimento é obrigatório').typeError('A data deve ser verdadeira'),
  emissionDate: yup.date().required('A data de emissão é obrigatório').typeError('A data deve ser verdadeira'),
  expirationDate: yup.date().required('A data de validade é obrigatório').typeError('A data deve ser verdadeira'),
})
