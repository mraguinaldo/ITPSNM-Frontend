import { CaretDoubleUp } from 'phosphor-react'

const Focus = () => {
  return (
    <div className="border-b-2 border-[#F4F4F4] gap-8 pb-6 flex items-start justify-between flex-wrap">
      <a href="/" className="flex items-start gap-3 font-medium uppercase w-full max-w-[276px]">
        <img src="/Logo.png" alt="logo" /> honestidade, sacrifício e delicadeza
      </a>
      <a href="/" className="flex gap-3 items-center font-medium">
        Ir para o topo <CaretDoubleUp size={18} color="#202020" />
      </a>
    </div>
  )
}

export { Focus }
