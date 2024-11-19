import { useEffect, useState } from 'react'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import { ArrowLeft, CheckCircle, MagnifyingGlass } from 'phosphor-react'
import { InputSearch } from '../inputs/search'
import { InvoiceCardRenderer } from '../invoice-card-renderer'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Property } from './property'
import { HeadLine } from './headline'
import { INVOICE_VIEW_OPTIONS, tableHeader } from './data'
import { DefaultModal } from '../modals/default'
import { UseTranslateInvoiceTypes } from '../../hooks/use-translate-invoice-type'

const InvoiceViewer = () => {
  const { mutate: useCheckEnrollment, data: student, isLoading:
    lookingForStudent, error: studentNotFound }: any = UseCheckEnrollment()
  const enrollmentId: any = Number(Cookies.get('enrollmentNumber'))

  const [enrollmentNumber, setEnrollmentNumber] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [invoiceId, setInvoiceId] = useState<number>(1000)
  const [currentInvoiceType, setCurrentInvoiceType] = useState<string>('PENDING')

  let approvedInvoices = student?.enrollment?.Invoice.filter((invoice: any) => invoice?.status === "PAID")
  let pendingInvoices = student?.enrollment?.Invoice?.filter((invoice: any) => invoice?.status === "PENDING")

  const fetchStudent = () => {
    const params = new URLSearchParams({
      [enrollmentNumber ? 'enrollmentNumber' : '']: enrollmentNumber || '',
    })
    useCheckEnrollment(params)
  }

  const searchStudent = (e: any) => {
    if (e.key === 'Enter') {
      fetchStudent()
    }
  }

  useEffect(() => {
    if (enrollmentId) {
      setEnrollmentNumber(enrollmentId)
    }
  }, [])


  const renderRows = (invoice: any) => (
    invoice.status === currentInvoiceType && <tr
      key={invoice?.id}
      className='hover:bg-[#ebebeb97] cursor-pointer'
      onClick={() => {
        setInvoiceId(invoice?.id)
        setShowModal(true)
        Cookies.set('enrollmentNumber', enrollmentNumber)
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
      <Property property={invoice?.employee?.fullName} />
      <Property property={UseTranslateInvoiceTypes(invoice?.type)} />
      <Property property={invoice?.status === 'PAID' ? 'Pago' : invoice?.status === 'PENDING' ? 'Pendente' : 'Recusado'} />
      <Property property={`${invoice?.totalAmount} Kz`} />
    </tr>
  )

  return (
    <section
      className={`w-full pl-8 py-16 lg:p-11 lg:rounded-[16px] bg-white flex flex-col gap-8 pr-6 ${student ? 'h-fit' : 'h-dvh'}`}
    >
      <Link
        to='/admin/painel/pagamentos'
        className="hover:bg-slate-300 rounded-full p-2 w-fit"
      >
        <ArrowLeft size={18} />
      </Link>
      <h1 className="text-[24px] lg:text-[32px] font-semibold leading-9">
        Faturas {student?.enrollment?.Invoice?.length > 0 && `( ${student?.enrollment?.Invoice?.length} )`}
      </h1>

      <div id="search__area" className="flex flex-col items-center relative w-full">
        <InputSearch
          placeholder={'Insira o número de inscrição do aluno...'}
          className="flex-row-reverse"
          icon={
            <MagnifyingGlass
              id="search-icon"
              className="cursor-pointer p-1 hover:bg-slate-200 rounded-full flex items-center justify-center"
              color="#000000"
              size={24}
              onClick={fetchStudent}
            />
          }
          value={enrollmentNumber}
          onKeyDown={(e: any) => searchStudent(e)}
          onChange={(e: any) => setEnrollmentNumber(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-4'>
        {student &&
          <div className='flex flex-wrap items-start sm:items-center gap-4 sm:gap-6  justify-between'>
            <h1
              className='text-[24px] font-semibold'>
              Aluno:{" "}
              <span
                className='font-normal'>
                {student?.enrollment?.students?.fullName}
              </span>
            </h1>
            <h1
              className='text-[18px] font-medium bg-green-200 rounded-md py-3 px-6 w-fit'>
              Saldo:{" "}
              <span
                className='font-normal'>
                {student?.enrollment?.StudentBalance?.balance} Kz
              </span>
            </h1>
          </div>
        }
        {student && <div className="flex gap-4 flex-wrap">
          {INVOICE_VIEW_OPTIONS.map(({ id, content, invoiceType }) => (
            <button
              key={id}
              type="button"
              className={`text-[14px] uppercase border py-2 px-4 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc] ${currentInvoiceType === invoiceType ? 'border-[#dcdcdc]' : 'border-[#dcdcdc00]'}`}
              onClick={() => setCurrentInvoiceType(invoiceType)}
            >
              {content} ( {invoiceType === 'ALL' ? student?.enrollment?.Invoice?.length : invoiceType === 'PENDING' ? pendingInvoices?.length : approvedInvoices?.length} )
            </button>
          ))}
        </div>
        }
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
                {student
                  && (student?.enrollment?.Invoice || []).map(renderRows)
                }
              </tbody>
            </table>
          </div>
        </div>
        {lookingForStudent &&
          <h1 className="text-[24px] md:text-[32px] font-semibold w-full justify-center flex items-center h-[248px]">
            Buscando faturas...
          </h1>
        }
        {studentNotFound &&
          <h1 className="text-[24px] md:text-[32px] font-semibold justify-center flex items-center h-[248px] w-full">
            Faturas não encontradas 😢
          </h1>
        }
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


export { InvoiceViewer }
