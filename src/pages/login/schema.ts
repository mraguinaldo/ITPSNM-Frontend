import * as yup from 'yup'

export const schemaForm = yup.object().shape({
  email: yup
    .string()
    .required('O email é obrigatório!!')
    .test('email-validation', 'Email inválido.', (email) => {
      const emailRegex =
        /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/
      if (email?.match(emailRegex)) return true
    }),
  password: yup
    .string()
    .required('A palavra-passe é obrigatório!!')
    .min(4, 'A palavra-passe deve ter no mínimo 6 letras'),
})
