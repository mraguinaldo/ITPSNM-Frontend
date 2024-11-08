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
  amount: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const parsedValue = originalValue.replace(',', '.');
        return parsedValue === '' ? undefined : parseFloat(parsedValue);
      }
      return value;
    })
    .required('Insira a quantia')
    .min(1),
  date: yup.date().required('A data é obrigatório').typeError('A data deve ser verdadeira'),
  paymentId: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .required('O número do pagamento é obrigatório')
    .min(1),
})
