import { Check, CheckCircle, Printer } from "phosphor-react"
import { Field } from "../payments/field"
import { useReactToPrint } from "react-to-print"
import { useEffect, useRef } from "react"
import { Button } from "../button"
import { UseRenameClass } from "../../hooks/useRenameClass"
import Cookies from "js-cookie"
import { UseMakePayment } from "../../hooks/useMakePayment"
import { ProgressBar } from "../progress-bar"
import { useNavigate } from "react-router-dom"


const InvoiceCardRenderer = ({ invoice, student }: { invoice: any, student: any }) => {
  const { mutate: useMakePayment, isLoading: makingThePayment, isSuccess } = UseMakePayment()
  const employeeId = Number(Cookies.get('employeeNumber'))
  const enrollmentId = Number(Cookies.get('enrollmentNumber'))
  const transactionNumber = Cookies.get('receiptNumber')
  const redirectTo = useNavigate()

  const currentInvoice = useRef<HTMLDivElement>(null);
  const printInvoice: any = useReactToPrint({ contentRef: currentInvoice });


  const makePayment = (invoiceId: any) => {
    const formData = {
      employeeId,
      enrollmentId,
      transactionNumber,
      invoiceId
    }

    useMakePayment({ formData })
  }

  useEffect(() => {
    if (isSuccess) {
      Cookies.set('receiptNumber', '')
      redirectTo('/admin/painel/exibir-pagamentos')
    }
  }, [isSuccess])

  return (
    <div className="w-full flex gap-2 flex-col items-start h-full">
      {makingThePayment && <ProgressBar />}
      <div ref={currentInvoice} key={invoice.id} id={`fatura${invoice?.id}`} className='flex flex-col gap-4 rounded-lg border border-[#dbdbdbca] p-4 w-full relative h-full'>
        <div className='flex flex-col gap-3'>
          <Field field='Nome' value={student?.students?.fullName} />

          <div className="flex justify-between flex-wrap gap-4">
            <Field field='Número de estudante' value={student?.id} />
            <Field field='' value={UseRenameClass(student?.levels?.name)} />
            <Field field='Número da fatura' value={invoice?.id} />
          </div>
          {invoice?.status === 'PAID' &&
            <CheckCircle
              size={24}
              weight='duotone'
              color='#5ddd0d'
              className='absolute right-[16px] top-[14px]'
            />
          }

          <div className="flex justify-between flex-wrap gap-4">
            <Field field='Funcionário' value={invoice?.employee?.fullName} />
            <Field field='Tipo de pagamento' value={invoice?.type === "DECLARATION" ? "Declaração" :
              invoice?.type === "CERTIFICATE" ? "Certificado" :
                invoice?.type === "PASS" ? "Passe de estudante" :
                  invoice?.type === "UNIFORM" ? "Uniforme" :
                    invoice?.type === "TUITION" ? "Mensalidade" :
                      invoice?.type === "TUITION_PENALTY" ? "Multa de propina" :
                        "---"} />
            <Field field='Estado da fatura' value={invoice?.status === 'PAID' ? 'Pago' : invoice?.status === 'PENDING' ? 'Pendente' : 'Recusado'} />
          </div>

          <div className='flex flex-col gap-2 px-1'>
            <h2 className='uppercase font-semibold text-[14px]'>Itens pagos</h2>
            {invoice?.items?.map((item: any) => (
              <div key={item?.id} className='flex gap-2'>
                <Check size={14} className='mt-1' />
                <div className="flex gap-2 flex-wrap justify-between">
                  <h2>{item?.description}</h2>
                  <p>{item?.amount} Kz</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className='uppercase text-[14px] pt-8 border-b pb-6 w-full font-semibold'>
            Quantia total: {invoice?.totalAmount} Kz
          </h2>

          <h2 className='text-[14px] text-center w-full'>
            Data: {new Date(invoice.created_at).toLocaleDateString()}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end w-full">
        <button onClick={printInvoice} className="p-2 rounded-full cursor-pointer hover:bg-slate-200">
          <Printer size={22} color="#000" weight="duotone" />
        </button>
        {invoice?.status !== 'PAID' && <Button
          onClick={() => makePayment(invoice?.id)}
          isLoading={false}
          type="button"
          content="Efectuar pagamento"
        />}

      </div>
    </div>
  )
}

export { InvoiceCardRenderer }