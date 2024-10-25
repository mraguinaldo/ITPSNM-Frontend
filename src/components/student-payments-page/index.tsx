import { useQueryClient } from "react-query"
import { InvoiceCardRenderer } from "../invoice-card-renderer"
import { useEffect } from "react"

const StudentPaymentsPage = () => {
  const queryClient = useQueryClient()
  const student: any = queryClient.getQueryData(['studentData'])

  useEffect(() => {
    if (!student) window.location.reload()
  }, [student])

  return (
    <section className="mt-36 sm:mt-32 pb-36 bg-white lg:bg-transparent">
      <div className="w-full max-w-[1296px] flex flex-col gap-9 m-auto px-5 lg:p-11 lg:rounded-[16px] pb-4 bg-white">
        <h2 className="font-semibold text-[24px] sm:text-[32px]">Faturas ( {student?.enrollment?.Invoice?.length} )</h2>
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
          {
            student && student?.enrollment?.Invoice.length > 0 ? student?.enrollment?.Invoice?.map((invoice: any) => (
              <InvoiceCardRenderer invoice={invoice} key={invoice?.id} student={student?.enrollment} />
            )) : <h2 className="font-semibold text-[24px] sm:text-[32px]">Sem faturas</h2>
          }
        </div>
      </div></section>
  )
}

export { StudentPaymentsPage }