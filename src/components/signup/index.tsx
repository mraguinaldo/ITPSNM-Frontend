import { Form } from './form'

interface ISignup {
  visible: boolean
}

const Signup = ({ visible }: ISignup) => {
  return (
    <section
      className={`w-full duration-300 flex flex-wrap gap-9 pr-4 overflow-y-scroll ${visible ? 'h-fit py-6' : 'h-0 py-0  '}`}
    >
      <Form />
    </section>
  )
}

export { Signup }
