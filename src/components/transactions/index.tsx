import { Form } from './form'

const TransactionsPage = () => {
  return (
    <section
      className={'w-full duration-300 flex flex-wrap gap-9 pr-4 overflow-y-scroll h-fit py-6 pl-4 pt-16 lg:py-11 lg:rounded-[16px] bg-white flex-col'}
    >
      <h1 className="text-[24px] lg:text-[32px] font-semibold leading-9">
        Transações
      </h1>
      <Form />
    </section>
  )
}

export { TransactionsPage }
