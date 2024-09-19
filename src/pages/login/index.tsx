import { Form } from './form'

const Login = () => {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-[486px] flex flex-col p-6 gap-9 items-center justify-center">
        <h1 className="uppercase font-bold text-[24px] md:text-[34px] tracking-[2px]">Login ITPSNM</h1>
        <Form />
      </div>
    </section>
  )
}

export { Login }
