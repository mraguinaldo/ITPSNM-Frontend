import { Link } from 'react-router-dom'
import { Form } from './form'
import { ArrowLeft } from 'phosphor-react'

const FormToEditEmployee = () => {
  return (
    <div className="w-full pl-8 py-16 lg:p-11 lg:rounded-[16px] bg-white flex flex-col gap-8">
      <Link to="/admin/painel/tabela-de-funcionarios" className="hover:bg-slate-300 rounded-full p-2 w-fit">
        <ArrowLeft size={18} />
      </Link>
      <Form />
    </div>
  )
}

export { FormToEditEmployee }
