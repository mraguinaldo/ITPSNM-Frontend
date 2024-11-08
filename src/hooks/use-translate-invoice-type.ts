
const UseTranslateInvoiceTypes = (invoice: string)=> {
  const invoiceTypes: any = {
    DECLARATION: "Declaração",
    CERTIFICATE: "Certificado",
    PASS: "Passe de estudante",
    UNIFORM: "Uniforme",
    TUITION: "Mensalidade",
    TUITION_PENALTY: "Multa de propina"
  };

  return invoiceTypes[invoice] || "---";
}

export { UseTranslateInvoiceTypes }