import { X } from 'phosphor-react'
import type { IDefaultModal } from './interface'

const DefaultModal = ({ children, display, closeModal }: IDefaultModal) => {
  return (
    <div
      className={`fixed w-full z-50 left-0 h-screen flex justify-center items-center top-0 duration-300 px-6 ${display ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="absolute inset-0 w-full h-screen bg-black opacity-85 z-10" onClick={closeModal}>
        {''}
      </div>
      <div className="w-full max-w-[424px] relative z-20 bg-white p-2 rounded-[8px]">
        <button
          type="button"
          id="close"
          className="absolute top-[-38px] right-0 rounded-full p-2 bg-[#000C13]"
          onClick={closeModal}
        >
          <X color="#fff" size={16} />
        </button>
        {children}
      </div>
    </div>
  )
}

export { DefaultModal }
