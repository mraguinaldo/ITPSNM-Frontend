import * as yup from 'yup'

interface FileValue {
  type: string
  size: number
}

export const schemaForm = yup.object().shape({
  identityCardNumber: yup
    .string()
    .required('O número do bilhete é obrigatório')
    .min(12, 'O número do bilhete deve ter no minimo 12 caracteres')
    .max(14, 'O número do bilhete deve ter no máximo 14 caracteres'),
  PHOTO: yup
    .mixed()
    .required('Carregue a sua foto')
    .test('image-validation', 'A Imagem deve ser JPG/PNG, até 1MB.', (value) => {
      if (typeof value === 'object') {
        const { size, type } = value as FileValue
        if (size <= 1000000 && (type === 'image/png' || type === 'image/jpeg')) {
          return true
        }
      }
    }),
  REPORT_CARD: yup
    .mixed()
    .required('Carregue a sua declaração ou certificado')
    .test('file-validation', 'Arquivo deve ser PDF, até 1MB.', (value) => {
      if (typeof value === 'object') {
        const { size, type } = value as File
        if (size <= 1000000 && type === 'application/pdf') {
          return true
        }
      }
    }),
  // vaccineCard: yup
  //   .mixed()
  //   .required('Carregue o seu cartão de vacina')
  //   .test('file-validation', 'Arquivo deve ser PDF, até 10MB.', (value) => {
  //     if (typeof value === 'object') {
  //       const { size, type } = value as File
  //       if (size <= 10000000 && type === 'application/pdf') {
  //         return true
  //       }
  //     }
  //   }),
  IDENTITY_CARD: yup
    .mixed()
    .required('Carregue o seu bilhete de identidade')
    .test('file-validation', 'Arquivo deve ser PDF, até 1MB.', (value) => {
      if (typeof value === 'object') {
        const { size, type } = value as File
        if (size <= 1000000 && type === 'application/pdf') {
          return true
        }
      }
    }),
  // receiptOfPayment: yup
  //   .mixed()
  //   .required('Carregue o seu recibo de pagamento')
  //   .test('file-validation', 'Arquivo deve ser PDF, até 10MB.', (value) => {
  //     if (typeof value === 'object') {
  //       const { size, type } = value as File
  //       if (size <= 10000000 && type === 'application/pdf') {
  //         return true
  //       }
  //     }
  //   }),
  // medicalCertificate: yup
  //   .mixed()
  //   .required('Carregue o seu atestado médico')
  //   .test('file-validation', 'Arquivo deve ser PDF, até 10MB.', (value) => {
  //     if (typeof value === 'object') {
  //       const { size, type } = value as File
  //       if (size <= 10000000 && type === 'application/pdf') {
  //         return true
  //       }
  //     }
  //   }),
})
