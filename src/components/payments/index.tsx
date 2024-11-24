import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, DotsThree, MagnifyingGlass, X } from 'phosphor-react'
import { InputSearch } from '../inputs/search'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import { Field } from './field'
import { UseApprovePayment } from '../../hooks/useApprovePayment'
import { useEffect, useReducer } from 'react'
import { ProgressBar } from '../progress-bar'
import { DefaultModal } from '../modals/default'
import { InvoiceCardRenderer } from '../invoice-card-renderer'
import Cookies from 'js-cookie'
import { FormToAddValuesToTheTransaction } from '../form-to-add-values/form'
import { initialValues, PAYMENT_OPTIONS, PAYMENT_VIEW_OPTIONS } from './data'
import { StudentOptionsModal } from '../students-table/modals/student-options'
import { reducer } from './reducer'
import { actions } from './actions'
import { ButtonPaymentType } from './button-payment-type'
import { TitleForProcessing } from '../title-for-processing'

const PaymentsPage = () => {
  const {
    data: student,
    error: studentNotFound,
    mutate: useCheckEnrollment,
    isLoading: lookingForStudent
  }: any = UseCheckEnrollment()

  const { mutate: useApprovePayment, isLoading, isSuccess } = UseApprovePayment()
  const enrollmentId: any = Number(Cookies.get('enrollmentNumber'))
  const [state, dispatch] = useReducer(reducer, initialValues)

  const seekPaymentsFromTheState = (state: "PAID" | "PENDING") => {
    return student?.
      enrollment?.
      Payment?.
      filter((
        payment: any) => payment?.status === state
      )
  }

  let approvedPayments = seekPaymentsFromTheState('PAID')
  let pendingPayments = seekPaymentsFromTheState('PENDING')

  const fetchStudent = () => {
    const params = new URLSearchParams({
      [state?.enrollmentNumber ? 'enrollmentNumber' : '']: state?.enrollmentNumber || '',
    })
    useCheckEnrollment(params)
  }

  const searchStudent = (e: any) => e.key === 'Enter' && fetchStudent()

  const openOptionsModal = (
    option: string,
    paymentId: number,
    invoiceId: number,
    employeeId: any) => {

    switch (option) {
      case 'Exibir fatura':
        dispatch({ type: actions.toggleInvoice, payload: invoiceId });
        dispatch({ type: actions.showStudentOptionsModal, payload: 1 });
        break
      case 'Acrescentar valores':
        dispatch({ type: actions.showStudentOptionsModal, payload: 2 });
        break
      case 'Aprovar pagamento':
        dispatch({ type: actions.toggleInvoice, payload: invoiceId });
        useApprovePayment({ paymentId, employeeId });
        break
    }

    dispatch({ type: actions.choosePayment, payload: paymentId });
  };

  useEffect(() => {
    if (enrollmentId) dispatch({ type: actions.chooseStudent, payload: enrollmentId });
  }, [])

  useEffect(() => {
    if (isSuccess) {
      Cookies.set('receiptNumber', '')
      Cookies.set('enrollmentNumber', '')
      fetchStudent()
    }
  }, [isSuccess])

  const RenderPaymentCard = (payment: any) => (
    <div
      key={payment.id}
      className={`flex-col gap-4 border-y border-[#dbdbdbca] p-4 w-full duration-300 transition-all relative overflow-hidden
      ${state?.currentPaymentType === 'ALL' ? 'flex' :
          state?.currentPaymentType === payment?.status ? 'flex' : 'hidden'}
        ${state?.paymentId === payment?.id ? 'max-h-[500px] bg-[#dbdbdb31]' : 'max-h-[58px] cursor-pointer hover:bg-[#dbdbdb5a] bg-transparent'}
          `
      }
    >
      <div className='flex flex-col gap-3'>
        <div className='absolute right-[16px] top-[14px] flex items-center justify-center h-[24px]'>
          {state?.paymentId === payment?.id ?
            <X
              color="#161616"
              size={18}
              onClick={() =>
                dispatch({ type: actions.choosePayment, payload: 0 })
              }
              className='cursor-pointer'
            /> :
            <DotsThree
              color="#161616"
              size={24}
              onClick={() =>
                dispatch({ type: actions.choosePayment, payload: payment?.id })
              }
              className='cursor-pointer'
            />
          }
        </div>
        <StudentOptionsModal isVisible={state?.paymentId === payment?.id}>
          {PAYMENT_OPTIONS.map(({ Icon, id, option }) =>
            <button
              type="button"
              key={id}
              className={`bg-transparent text-[14px] gap-2 items-center text-[#1c1c1c] 
                ${payment?.status !== 'PAID' ? 'flex' :
                  payment?.status === 'PAID' && option === 'Exibir fatura' ? 'flex' : 'hidden'}`
              }
              onClick={() =>
                openOptionsModal(
                  option,
                  payment.id,
                  payment?.invoiceId,
                  payment?.employeeId
                )
              }
            >
              <Icon size={14} color="#000" />
              {option}
            </button>
          )}

        </StudentOptionsModal>
        {payment?.status === 'PAID' &&
          <CheckCircle
            size={24}
            weight='duotone'
            color='#5ddd0d'
            className='absolute right-[46px] top-[14px]'
          />
        }

        <div className='flex flex-col gap-3' onClick={() =>
          dispatch({ type: actions.choosePayment, payload: payment?.id })
        }>
          <Field field='Id do pagamento' value={payment?.id} />
          <Field field='Funcionário' value={payment?.employeeId} />
          <Field field='Número do comprovativo' value={payment?.transactionId} />
          <Field field='Número da fatura' value={payment?.invoiceId} />
          <Field field='Estado do pagamento' value={payment?.status === 'PAID' ? 'Pago' : payment?.status === 'PENDING' ? 'Pendente' : 'Recusado'} />

          <h2 className='uppercase text-[14px] border-b pb-2 w-full font-semibold'>
            Quantia total: {payment?.totalAmount} Kz
          </h2>
        </div>

      </div>
    </div >
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
          value={state?.enrollmentNumber}
          onKeyDown={(e: any) => searchStudent(e)}
          onChange={(e: any) =>
            dispatch({ type: actions.chooseStudent, payload: e.target.value })
          }
        />
      </div>

      {lookingForStudent &&
        <TitleForProcessing title={'Buscando os pagamentos...'} />
      }

      {student &&
        <div className='flex flex-col gap-4'>
          <h1 className='text-[24px] font-semibold'>
            Aluno:{" "}
            <span
              className='font-normal'>
              {student?.enrollment?.students?.fullName}
            </span>
          </h1>

          <div className="flex gap-4 flex-wrap">
            {PAYMENT_VIEW_OPTIONS.map(({ id, content, paymentType }) => (
              <ButtonPaymentType
                key={id}
                content={content}
                currentPaymentType={state?.currentPaymentType}
                paymentType={paymentType}
                totalPayment={paymentType === 'ALL' ?
                  student?.enrollment?.Payment?.length :
                  paymentType === 'PENDING' ?
                    pendingPayments?.length : approvedPayments?.length}
                onClick={() =>
                  dispatch({ type: actions.changePaymentType, payload: paymentType })
                }
              />
            ))}
          </div>

          <div className='flex flex-col gap-3'>
            {student?.enrollment?.Payment?.map(RenderPaymentCard)}
          </div>
        </div>
      }
      {student &&
        (studentNotFound || student?.enrollment?.Payment?.length === 0) &&
        <TitleForProcessing title='Pagamentos não encontrados...' />
      }

      <DefaultModal
        display={state?.showModal !== 0}
        closeModal={() => {
          dispatch({ type: actions.showStudentOptionsModal, payload: 0 })
          dispatch({ type: actions.toggleInvoice, payload: 0 })
        }}
      >
        {state?.showModal === 1 ?
          student && student?.enrollment?.Invoice?.map((invoice: any) => (
            invoice?.id === state?.invoiceId &&
            <InvoiceCardRenderer key={invoice.id} invoice={invoice} student={student?.enrollment} />
          )) : state?.showModal === 2 &&
          <FormToAddValuesToTheTransaction
            enrollmentId={state?.enrollmentNumber}
            paymentId={state?.paymentId}
          />
        }
      </DefaultModal>
    </section>
  )
}

export { PaymentsPage }
