import { useEffect, useState } from "react"
import { UseCheckEnrollment } from "../../hooks/useCheckEnrollment"
import { InvoiceCardRenderer } from "../invoice-card-renderer"
import { UseGetData } from "../../hooks/useGetData"
import { Link, useSearchParams } from "react-router-dom"
import { ArrowLeft, CheckCircle } from "phosphor-react"
import { ProgressBar } from "../progress-bar"
import { DefaultModal } from "../modals/default"
import { HeadLine } from "../employees-table/headline"
import { Property } from "../employees-table/property"
import { UseTranslateInvoiceTypes } from "../../hooks/use-translate-invoice-type"
import { tableHeader } from "../invoice-viewer/data"


const ShowStudentInvoices = () => {
  const { mutate: useCheckEnrollment, data: enrollmentFound, isLoading: searchingEnrollment }: any = UseCheckEnrollment()
  const identityCardNumber = UseGetData('chosenStudent')
  const previousRoute = UseGetData('previousRoute')
  const [, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (identityCardNumber) {
      const params = new URLSearchParams({
        identityCardNumber: identityCardNumber,
      })
      setSearchParams(params)
      useCheckEnrollment(params)
    }
  }, [useCheckEnrollment, identityCardNumber, setSearchParams])

  const [showModal, setShowModal] = useState<boolean>(false)
  const [invoiceId, setInvoiceId] = useState<number>(1000)


  // useEffect(() => {
  //   if (!enrollmentFound) window.location.reload()
  // }, [enrollmentFound])

  const renderRows = (invoice: any) => (
    <tr
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
      <Property property={enrollmentFound?.enrollment?.students?.fullName} />
      <Property property={enrollmentFound?.enrollment?.id} />
      <Property property={invoice?.employee?.fullName} />
      <Property property={UseTranslateInvoiceTypes(invoice?.type)} />
      <Property property={invoice?.status === 'PAID' ? 'Pago' : invoice?.status === 'PENDING' ? 'Pendente' : 'Recusado'} />
      <Property property={`${invoice?.totalAmount} Kz`} />
    </tr>
  )

  return (
    <section
      className={`w-full pl-8 py-16 lg:p-11 lg:rounded-[16px] bg-white flex flex-col gap-8 pr-6 ${enrollmentFound ? 'h-fit' : 'h-dvh'}`}
    >
      <div className='flex flex-col gap-4'>
        {searchingEnrollment && <ProgressBar />}
        <Link to={previousRoute} className="hover:bg-slate-300 rounded-full p-2 w-fit">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row justify-between sm:items-center">
          <h2 className="font-semibold text-[24px]">Faturas {enrollmentFound?.enrollment?.Invoice?.length > 0 && `( ${enrollmentFound?.enrollment?.Invoice?.length} )`} </h2>
          <h2
            className='text-[20px] font-semibold'>
            Aluno:{" "}
            <span
              className='font-normal'>
              {enrollmentFound?.enrollment?.students?.fullName}
            </span>
          </h2>
        </div>
        <div
          className='flex flex-row pt-3 w-full overflow-x-scroll scroll-transparent'
        >
          <div id="grades" className="lg:w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#000C13] text-left whitespace-nowrap ">
                  {tableHeader.map(({ content, id }) => (
                    <HeadLine key={id} colSpan={1} content={content} visible />
                  ))}
                </tr>
              </thead>

              <tbody>
                {enrollmentFound
                  && (enrollmentFound?.enrollment?.Invoice || []).map(renderRows)
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
          enrollmentFound && enrollmentFound?.enrollment?.Invoice?.map((invoice: any) => (
            invoice?.id === invoiceId &&
            <InvoiceCardRenderer key={invoice.id} invoice={invoice} student={enrollmentFound?.enrollment} />
          ))
        }
      </DefaultModal>

    </section>
  )
}

export { ShowStudentInvoices }