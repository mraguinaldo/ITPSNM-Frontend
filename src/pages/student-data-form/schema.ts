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
  level: yup.string().required('A classe é obrigatório'),
  course: yup.string().required('O curso é obrigatório'),
})
