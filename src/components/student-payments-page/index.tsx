import { useEffect, useState } from "react"
import { InvoiceCardRenderer } from "../invoice-card-renderer"
import { CheckCircle } from "phosphor-react"
import { DefaultModal } from "../modals/default"
import { HeadLine } from "../employees-table/headline"
import { Property } from "../employees-table/property"
import { UseTranslateInvoiceTypes } from "../../hooks/use-translate-invoice-type"
import { tableHeader } from "../invoice-viewer/data"
import { useQueryClient } from "react-query"

const StudentPaymentsPage = () => {
  const queryClient = useQueryClient()
  const student: any = queryClient.getQueryData(['studentData'])

  useEffect(() => { if (!student) window.location.reload() }, [student])

  const [showModal, setShowModal] = useState<boolean>(false)
  const [invoiceId, setInvoiceId] = useState<number>(1000)

  const renderRows = (invoice: any) => (
    invoice?.status === 'PAID' && <tr
      key={invoice?.id}
      className='hover:bg-[#ebebeb97] cursor-pointer'
      onClick={() => {
        setInvoiceId(invoice?.id)
        setShowModal(true)
      }}
    >
      {invoice?.status === 'PAID' ?
        <td className='flex items-center justify-center pt-2'>
          <CheckCircle
            size={24}
            weight='duotone'
            color='#5ddd0d'
          />
        </td> : <td className='flex items-center justify-center pt-2'>---</td>
      }
      <Property property={invoice?.id} />
      <Property property={student?.enrollment?.students?.fullName} />
      <Property property={student?.enrollment?.id} />
      <Property property={UseTranslateInvoiceTypes(invoice?.type)} />
      <Property property={invoice?.status === 'PAID' ? 'Pago' : invoice?.status === 'PENDING' ? 'Pendente' : 'Recusado'} />
      <Property property={`${invoice?.totalAmount} Kz`} />
    </tr>
  )

  return (
    <section
      className={`w-full max-w-[1296px] m-auto px-6 py-20 lg:px-11 lg:py-36  lg:rounded-[16px] bg-white flex flex-col gap-8 ${student ? 'h-fit' : 'h-dvh'}`}
    >
      <div className='flex flex-col gap-4'>
        <div
          className='flex flex-row pt-3 w-full overflow-x-scroll scroll-transparent'
        >
          <div id="grades" className="lg:w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#000C13] text-left whitespace-nowrap ">
                  {tableHeader.map(({ content, id }) => (
                    content !== 'Funcionário' &&
                    <HeadLine key={id} colSpan={1} content={content} visible />
                  ))}
                </tr>
              </thead>

              <tbody>
                {student
                  && (student?.enrollment?.Invoice || []).map(renderRows)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DefaultModal
        display={showModal}
        closeModal={() => setShowModal(false)}
      >
        {showModal &&
          student && student?.enrollment?.Invoice?.map((invoice: any) => (
            invoice?.id === invoiceId &&
            <InvoiceCardRenderer key={invoice.id} invoice={invoice} student={student?.enrollment} />
          ))
        }
      </DefaultModal>

    </section>
  )
}

export { StudentPaymentsPage }
