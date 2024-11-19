import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, MagnifyingGlass } from 'phosphor-react'
import { InputSearch } from '../inputs/search'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import { Button } from '../button'
import { Field } from './field'
import { UseApprovePayment } from '../../hooks/useApprovePayment'
import { useEffect, useState } from 'react'
import { ProgressBar } from '../progress-bar'
import { DefaultModal } from '../modals/default'
import { InvoiceCardRenderer } from '../invoice-card-renderer'
import Cookies from 'js-cookie'
import { FormToAddValuesToTheTransaction } from '../form-to-add-values/form'
import { PAYMENT_VIEW_OPTIONS } from './data'

const PaymentsPage = () => {
  const { mutate: useCheckEnrollment, data: student, isLoading:
    lookingForStudent, error: studentNotFound }: any = UseCheckEnrollment()
  const { mutate: useApprovePayment, isLoading, isSuccess } = UseApprovePayment()
  const enrollmentId: any = Number(Cookies.get('enrollmentNumber'))

  const [enrollmentNumber, setEnrollmentNumber] = useState<string>('')
  const [currentPaymentType, setCurrentPaymentType] = useState<string>('ALL')
  const [paymentId, setPaymentId] = useState<number>()
  const [showModal, setShowModal] = useState<number>(0)
  const [invoiceId, setInvoiceId] = useState<number>(10000)


  let approvedPayments = student?.enrollment?.Payment?.filter((payment: any) => payment?.status === "PAID")
  let pendingPayments = student?.enrollment?.Payment?.filter((payment: any) => payment?.status === "PENDING")

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

  useEffect(() => {
    if (isSuccess) {
      Cookies.set('receiptNumber', '')
      Cookies.set('enrollmentNumber', '')
      fetchStudent()
    }
  }, [isSuccess])

  const RenderPaymentCard = (payment: any) => (
    <div key={payment.id} className={`flex-col gap-4 rounded-lg border border-[#dbdbdbca] p-4 w-full relative ${currentPaymentType === 'ALL' ? 'flex' : currentPaymentType === payment?.status ? 'flex' : 'hidden'}`}>
      <div className='flex flex-col gap-3'>
        {payment?.status === 'PAID' &&
          <CheckCircle
            size={24}
            weight='duotone'
            color='#5ddd0d'
            className='absolute right-[16px] top-[14px]'
          />
        }

        <Field field='Id do pagamento' value={payment?.id} />
        <Field field='Funcionário' value={payment?.employeeId} />
        <Field field='Número do comprovativo' value={payment?.transactionId} />
        <Field field='Número da fatura' value={payment?.invoiceId} />
        <Field field='Estado do pagamento' value={payment?.status === 'PAID' ? 'Pago' : payment?.status === 'PENDING' ? 'Pendente' : 'Recusado'} />

        <h2 className='uppercase text-[14px] border-b pb-2 w-full font-semibold'>
          Quantia total: {payment?.totalAmount} Kz
        </h2>
      </div>

      <div className="flex flex-col gap-2 items-end w-full">
        <button onClick={() => {
          setInvoiceId(payment?.invoiceId)
          setShowModal(1)
        }} className="p-2 rounded-lg cursor-pointer hover:bg-slate-200 border border-[#eaecec] w-full font-semibold">
          Exibir fatura
        </button>
        {payment?.status !== 'PAID' &&
          <button onClick={() => {
            setShowModal(2)
            setPaymentId(payment.id)
          }} className="p-2 rounded-lg cursor-pointer hover:bg-green-100 border border-[#eaecec] w-full font-semibold bg-green-200">
            Acrescentar Valores
          </button>
        }
        {payment?.status !== 'PAID' &&
          <Button
            type='button'
            content='Aprovar pagamento'
            onClick={() => {
              setInvoiceId(payment?.invoiceId)
              useApprovePayment({ paymentId: payment?.id, employeeId: payment?.employeeId })
            }}
            isLoading={isLoading}
          />}
      </div>
    </div>
  )


  return (
    <section
      className={`w-full duration-300 flex flex-wrap gap-9 pr-4 overflow-y-scroll py-6 pl-4 pt-16 lg:py-11 lg:rounded-[16px] bg-white flex-col ${student ? 'h-fit' : 'h-dvh'}`}
    >
      {isLoading && <ProgressBar />}
      <h1 className="text-[24px] lg:text-[32px] font-semibold leading-9">
        Pagamentos {student?.enrollment?.Payment?.length > 0 && `( ${student?.enrollment?.Payment?.length} )`}
      </h1>
      <div className='flex justify-between items-center gap-4 pb-4'>
        <Link
          to='/admin/painel/efectuar-pagamento'
          className="hover:bg-slate-300 rounded-full p-2 w-fit"
          onClick={() => Cookies.set('enrollmentNumber', '')}
        >
          <ArrowLeft size={18} />
        </Link>
      </div>
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
      {lookingForStudent &&
        <h1 className="text-[24px] md:text-[32px] font-semibold w-full justify-center flex items-center h-[248px]">
          Buscando os pagamentos...
        </h1>
      }
      {student && (studentNotFound || student?.enrollment?.Payment?.length === 0) &&
        <h1 className="text-[24px] md:text-[32px] font-semibold justify-center flex items-center h-[248px] w-full">
          Pagamentos não encontrado 😢
        </h1>
      }
      <div className='flex flex-col gap-4'>
        {student &&
          <h1
            className='text-[24px] font-semibold'>
            Aluno:{" "}
            <span
              className='font-normal'>
              {student?.enrollment?.students?.fullName}
            </span>
          </h1>}
        {student && <div className="flex gap-4 flex-wrap">
          {
            PAYMENT_VIEW_OPTIONS.map(({ id, content, paymentType }) => (
              <button
                key={id}
                type="button"
                className={`text-[14px] uppercase border py-2 px-4 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc] ${currentPaymentType === paymentType ? 'border-[#dcdcdc]' : 'border-[#dcdcdc00]'}`}
                onClick={() => setCurrentPaymentType(paymentType)}
              >
                {content} ( {paymentType === 'ALL' ? student?.enrollment?.Payment?.length : paymentType === 'PENDING' ? pendingPayments?.length : approvedPayments?.length} )
              </button>
            ))
          }
        </div>}
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
          {
            student && student?.enrollment?.Payment?.map(RenderPaymentCard)
          }
        </div>
      </div>

      <DefaultModal
        display={showModal !== 0}
        closeModal={() => {
          setShowModal(0)
          setInvoiceId(10000)
        }}
      >
        {showModal === 1 ?
          student && student?.enrollment?.Invoice?.map((invoice: any) => (
            invoice?.id === invoiceId &&
            <InvoiceCardRenderer key={invoice.id} invoice={invoice} student={student?.enrollment} />
          )) : showModal === 2 &&
          <FormToAddValuesToTheTransaction
            enrollmentId={enrollmentNumber}
            paymentId={paymentId}
          />
        }
      </DefaultModal>
    </section>
  )
}

export { PaymentsPage }
