import * as yup from 'yup'

export const schemaForm = yup.object().shape({
  currentPassword: yup.string().required('A palavra-passe antiga é obrigatório!!'),
  newPassword: yup
    .string()
    .required('A palavra-passe nova é obrigatório!!')
    .min(4, 'A palavra-passe deve ter no mínimo 6 letras'),
})
