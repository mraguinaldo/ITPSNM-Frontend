import * as yup from 'yup'

export const schemaForm = yup.object().shape({
  quarter: yup.string().required('O trimestre é obrigatório'),
  subjectId: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .required('A disciplina é obrigratório'),
  level: yup.string().required('A classe é obrigatório'),
  p1: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const parsedValue = originalValue.replace(',', '.');
        return parsedValue === '' ? undefined : parseFloat(parsedValue);
      }
      return value;
    })
    .min(0, 'Deve ser maior ou igual a 0')
    .max(20, 'Deve ser menor ou igual a 20'),
  p2: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const parsedValue = originalValue.replace(',', '.');
        return parsedValue === '' ? undefined : parseFloat(parsedValue);
      }
      return value;
    })
    .min(0, 'Deve ser maior ou igual a 0')
    .max(20, 'Deve ser menor ou igual a 20'),
  pt: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const parsedValue = originalValue.replace(',', '.');
        return parsedValue === '' ? undefined : parseFloat(parsedValue);
      }
      return value;
    })
    .min(0, 'Deve ser maior ou igual a 0')
    .max(20, 'Deve ser menor ou igual a 20'),
  nee: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const parsedValue = originalValue.replace(',', '.');
        return parsedValue === '' ? undefined : parseFloat(parsedValue);
      }
      return value;
    })
    .min(0, 'Deve ser maior ou igual a 0')
    .max(20, 'Deve ser menor ou igual a 20'),
  ims: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const parsedValue = originalValue.replace(',', '.');
        return parsedValue === '' ? undefined : parseFloat(parsedValue);
      }
      return value;
    })
    .min(0, 'Deve ser maior ou igual a 0')
    .max(20, 'Deve ser menor ou igual a 20'),
  resource: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const parsedValue = originalValue.replace(',', '.');
        return parsedValue === '' ? undefined : parseFloat(parsedValue);
      }
      return value;
    })
    .min(0, 'Deve ser maior ou igual a 0')
    .max(20, 'Deve ser menor ou igual a 20'),
})
