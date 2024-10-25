import * as yup from 'yup'

export const schemaForm = yup.object().shape({
  enrollmentId: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .required('O identificador do usuário é obrigatório')
    .min(1),
  employeeId: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .required('O identificador do funcionário é obrigatório')
    .min(1),
  invoiceId: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .min(1),
  status: yup.string().required('O status é obrigatório'),

  dueDate: yup.string()
    .required('A data de validade é obrigatório')
    .typeError('A data deve ser verdadeira'),
  issueDate: yup.string()
    .required('A data de emissão é obrigatório')
    .typeError('A data deve ser verdadeira'),

  items: yup.array().of(
    yup.object().shape({
      description: yup.string().required('A descrição é obrigatória'),
      amount: yup
        .number()
        .required('O valor é obrigatório')
        .transform((value, originalValue) => {
          if (typeof originalValue === 'string') {
            const parsedValue = originalValue.replace(',', '.');
            return parsedValue === '' ? undefined : parseFloat(parsedValue);
          }
          return value;
        })
    })
  )
})
