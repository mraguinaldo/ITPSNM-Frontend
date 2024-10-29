import { Link } from 'react-router-dom'
import { Form } from './form'
import { ArrowLeft } from 'phosphor-react'

const PaymentReceiptsPage = () => {
  return (
    <section
      className={'w-full duration-300 flex flex-wrap gap-9 pr-4 overflow-y-scroll h-fit py-6 pl-4 pt-16 lg:py-11 lg:rounded-[16px] bg-white flex-col'}
    >
      <Link to='/admin/painel/pagamentos' className="hover:bg-slate-300 rounded-full p-2 w-fit">
        <ArrowLeft size={18} />
      </Link>
      <h1 className="text-[24px] lg:text-[32px] font-semibold leading-9">
        Cadastrar recibo
      </h1>
      <Form />
    </section>
  )
}

export { PaymentReceiptsPage }
