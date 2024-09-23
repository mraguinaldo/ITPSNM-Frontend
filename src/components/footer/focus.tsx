import { CaretDoubleUp } from 'phosphor-react'
import { Link } from 'react-router-dom'

const Focus = () => {
  const scrollPage = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="border-b border-[#f4f4f45f] gap-8 pb-6 flex items-start justify-between flex-wrap">
      <Link to="/" className="flex items-start text-white gap-3 font-medium uppercase w-full max-w-[276px]">
        <img src="/Logo.png" alt="logo" /> honestidade, sacrifício e delicadeza
      </Link>
      <button
        type="button"
        className="flex gap-3 items-center font-medium text-white bg-transparent duration-150 cursor-pointer hover:opacity-70"
        onClick={scrollPage}
      >
        Ir para o topo <CaretDoubleUp size={18} color="#fff" />
      </button>
    </div>
  )
}

export { Focus }
