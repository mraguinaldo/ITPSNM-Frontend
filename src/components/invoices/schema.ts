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
  type: yup.string().required('O tipo é obrigatório'),
  dueDate: yup.string()
    .required('A data de validade é obrigatório')
    .typeError('A data deve ser verdadeira'),
  issueDate: yup.string()
    .required('A data de emissão é obrigatório')
    .typeError('A data deve ser verdadeira'),
  levelId: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .required('A classe é obrigatória'),
  academicYear: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue.match(/^(\d{4})-(\d{4})$/)) {
        const anoAtual = Number(originalValue.slice(0, 4));
        const anoSeguinte = Number(originalValue.slice(-4));

        if (anoSeguinte - anoAtual === 1) {
          return value; 
        }
      }

      return undefined;
    })
    .required('Ex: 2024-2025'),
  items: yup.array().of(
      yup.object().shape({
        description: yup.string().required('A descrição é obrigatória'),
        qty: yup
          .number()
          .transform((value, originalValue) => (originalValue === '' ? undefined : value))
          .min(0)
          .required('A quantidade é obrigatória'),
        itemPriceId: yup
          .number()
          .required('O valor é obrigatório')
          .transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
              const parsedValue = originalValue.replace(',', '.');
              return parsedValue === '' ? undefined : parseFloat(parsedValue);
            }
            return value;
          }),
        month: yup
          .array()
          .of(
            yup
              .string()
              .oneOf(
                [
                  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
                  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
                ],
                'Mês inválido'
              )
          )
          .nullable() 
          .notRequired() 
      })
    )
})
