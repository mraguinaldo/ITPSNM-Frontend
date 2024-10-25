import { Link } from 'react-router-dom'
import { Form } from './form'
import { ArrowLeft, CheckCircle, MagnifyingGlass } from 'phosphor-react'
import { useReducer, useState } from 'react'
import { reducer } from './reducer'
import { initialValues } from './data'
import { actions } from './actions'
import { InputSearch } from '../inputs/search'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import { Button } from '../button'
import { Field } from './field'
import { UseApprovePayment } from '../../hooks/useApprovePayment'

const PaymentsPage = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const { mutate: useCheckEnrollment, data: student, isLoading:
    lookingForStudent, error: studentNotFound }: any = UseCheckEnrollment()
  const { mutate: useApprovePayment, isLoading } = UseApprovePayment()

  const [enrollmentNumber, setEnrollmentNumber] = useState<string>('')

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

  const RenderPaymentCard = (payment: any) => (
    <div key={payment.id} className='flex flex-col gap-4 rounded-lg border border-[#dbdbdbca] p-4 w-full relative'>
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
        <Field field='Número da transação' value={payment?.transactionId} />
        <Field field='Número da fatura' value={payment?.invoiceId} />
        <Field field='Estado do pagamento' value={payment?.status === 'PAID' ? 'Pago' : payment?.status === 'PENDING' ? 'Pendente' : 'Recusado'} />

        <h2 className='uppercase text-[14px] border-b pb-2 w-full font-semibold'>
          Quantia total: {payment?.totalAmount} Kz
        </h2>
      </div>
      {payment?.status !== 'PAID' &&
        <Button
          type='button'
          content='Aprovar pagamento'
          onClick={() => {
            useApprovePayment({ paymentId: payment?.id, employeeId: payment?.employeeId })
          }}
          isLoading={isLoading}
        />}
    </div>
  )

  return (
    <section
      className={'w-full duration-300 flex flex-wrap gap-9 pr-4 overflow-y-scroll h-fit py-6 pl-4 pt-16 lg:py-11 lg:rounded-[16px] bg-white flex-col'}
    >
      <h1 className="text-[24px] lg:text-[32px] font-semibold leading-9">
        Pagamentos {student?.enrollment?.Payment?.length > 0 && `( ${student?.enrollment?.Payment?.length} )`}
      </h1>
      <div className='flex justify-between items-center gap-4 pb-4'>
        {!state.paymentsState &&
          <Link
            to='/admin/painel/pagamentos'
            className="hover:bg-slate-300 rounded-full p-2 w-fit"
          >
            <ArrowLeft size={18} />
          </Link>
        }

        <button
          type="button"
          onClick={() => dispatch({ type: actions.displayPayments, payload: !state.paymentsState })}
          className="bg-[#000] text-[14px] sm:text-[16px] text-white font-semibold py-3 px-6 rounded-[32px] uppercase hover:brightness-50 duration-150 "
        >
          {state.paymentsState ? <ArrowLeft size={16} weight="bold" color="#fff" /> : 'Exibir pagamentos'}
        </button>
      </div>
      {state.paymentsState ? <>
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
        {studentNotFound &&
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
          <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
            {
              student && student?.enrollment?.Payment?.map(RenderPaymentCard)
            }
          </div>
        </div>
      </> : <Form />}

    </section>
  )
}

export { PaymentsPage }
