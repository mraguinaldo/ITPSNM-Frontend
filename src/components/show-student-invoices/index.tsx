import { useEffect } from "react"
import { UseCheckEnrollment } from "../../hooks/useCheckEnrollment"
import { InvoiceCardRenderer } from "../invoice-card-renderer"
import { UseGetData } from "../../hooks/useGetData"
import { Link, useSearchParams } from "react-router-dom"
import { ArrowLeft } from "phosphor-react"
import { ProgressBar } from "../progress-bar"


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

  return (
    <section className={'w-full duration-300 flex gap-9 px-6 py-6 pt-16 lg:py-11 lg:rounded-[16px] bg-white flex-col justify-center'}>
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
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
        {
          enrollmentFound && enrollmentFound?.enrollment?.Invoice?.map((invoice: any) => (
            <InvoiceCardRenderer invoice={invoice} key={invoice?.id} student={enrollmentFound?.enrollment} />
          ))
        }
      </div>
    </section>
  )
}

export { ShowStudentInvoices }