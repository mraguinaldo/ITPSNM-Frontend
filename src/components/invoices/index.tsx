import { Form } from './form'
import { ArrowLeft } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { UsestoreData } from '../../hooks/useStoreData'

const InvoicesPage = () => {
  return (
    <section
      className={'w-full duration-300 flex flex-wrap gap-4 pr-4 overflow-y-scroll h-fit py-6 pl-4 pt-16 lg:py-11 lg:rounded-[16px] bg-white flex-col'}
    >
      <Link
        to='/admin/painel/pagamentos'
        className="hover:bg-slate-300 rounded-full p-2 w-fit"
      >
        <ArrowLeft size={18} />
      </Link>
      <div className='flex gap-3 flex-col sm:flex-row justify-between items-center'>
        <h1 className="text-[24px] lg:text-[32px] font-semibold leading-9">
          Gerar faturas
        </h1>
        <div className='flex justify-between items-center gap-4 pb-4'>
          <Link
            to="/admin/painel/exibir-pagamentos"
            onClick={() => UsestoreData('currentRoute', '/admin/painel/exibir-pagamentos')}
            className="bg-[#000] text-[14px] sm:text-[16px] text-white font-semibold py-3 px-6 rounded-[32px] uppercase hover:brightness-50 duration-150 "
          >
            Exibir pagamentos
          </Link>
        </div>
      </div>
      <Form />
    </section>
  )
}


export { InvoicesPage }
