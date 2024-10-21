import * as yup from 'yup'

export const schemaForm = yup.object().shape({
  transactionNumber: yup.string().required('O número da transação é obrigatório'),
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
    .required('O número da fatura é obrigatório')
    .min(1),
})
