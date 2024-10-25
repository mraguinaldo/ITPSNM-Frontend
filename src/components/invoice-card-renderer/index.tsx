import { Check, CheckCircle } from "phosphor-react"
import { Field } from "../payments/field"
import { useReactToPrint } from "react-to-print"
import { useRef } from "react"
import { Button } from "../button"
import { UseRenameClass } from "../../hooks/useRenameClass"


const InvoiceCardRenderer = ({ invoice, student }: { invoice: any, student: any }) => {

  const currentInvoice = useRef<HTMLDivElement>(null);
  const printInvoice: any = useReactToPrint({ contentRef: currentInvoice });

  return (
    <div className="w-full flex gap-2 flex-col items-start h-full">
      <div ref={currentInvoice} key={invoice.id} id={`fatura${invoice.id}`} className='flex flex-col gap-4 rounded-lg border border-[#dbdbdbca] p-4 w-full relative h-full'>
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
            <Field field='Saldo do aluno' value={`${student?.StudentBalance[0]?.balance} Kz`} />
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

      <Button
        onClick={printInvoice}
        isLoading={false}
        type="button"
        content="Imprimir fatura"
      />
    </div>
  )
}

export { InvoiceCardRenderer }