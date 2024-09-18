import { CaretDoubleUp } from 'phosphor-react'

const Focus = () => {
  return (
    <div className="border-b border-[#f4f4f45f] gap-8 pb-6 flex items-start justify-between flex-wrap">
      <a href="/" className="flex items-start text-white gap-3 font-medium uppercase w-full max-w-[276px]">
        <img src="/Logo.png" alt="logo" /> honestidade, sacrifício e delicadeza
      </a>
      <a href="/" className="flex gap-3 items-center font-medium text-white">
        Ir para o topo <CaretDoubleUp size={18} color="#fff" />
      </a>
    </div>
  )
}

export { Focus }
