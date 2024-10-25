import { useState } from 'react'
import { Form } from './form'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import { ArrowLeft, MagnifyingGlass } from 'phosphor-react'
import { InputSearch } from '../inputs/search'
import { InvoiceCardRenderer } from '../invoice-card-renderer'

const InvoicesPage = () => {
  const [invoicesState, setInvoicesState] = useState<boolean>(false)
  const { mutate: useCheckEnrollment, data: student, isLoading:
    lookingForStudent, error: studentNotFound }: any = UseCheckEnrollment()

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

  return (
    <section
      className={'w-full duration-300 flex flex-wrap gap-9 pr-4 overflow-y-scroll h-fit py-6 pl-4 pt-16 lg:py-11 lg:rounded-[16px] bg-white flex-col'}
    >
      <div className='flex gap-3 flex-col sm:flex-row justify-between items-center'>
        <h1 className="text-[24px] lg:text-[32px] font-semibold leading-9">
          Faturas {student?.enrollment?.Invoice?.length > 0 && `( ${student?.enrollment?.Invoice?.length} )`}
        </h1>
        <div className='flex justify-between items-center gap-4 pb-4'>
          <button
            type="button"
            onClick={() => setInvoicesState(prev => !prev)}
            className="bg-[#000] text-[14px] sm:text-[16px] text-white font-semibold py-3 px-6 rounded-[32px] uppercase hover:brightness-50 duration-150 "
          >
            {invoicesState ? <ArrowLeft size={16} weight="bold" color="#fff" /> : 'Exibir faturas'}
          </button>
        </div>
      </div>
      {invoicesState ? <>
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
            Buscando faturas...
          </h1>
        }
        {studentNotFound &&
          <h1 className="text-[24px] md:text-[32px] font-semibold justify-center flex items-center h-[248px] w-full">
            Faturas não encontradas 😢
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
              student && student?.enrollment?.Invoice?.map((invoice: any) => (
                <InvoiceCardRenderer key={invoice.id} invoice={invoice} student={student?.enrollment} />
              ))
            }
          </div>
        </div>
      </> :
        <Form />}
    </section>
  )
}


export { InvoicesPage }
