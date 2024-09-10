import { X } from 'phosphor-react'
import type { IStudentInformationModal } from './interfaces'

const StudentInformationModal = ({ visible, children, toggleStateModal }: IStudentInformationModal) => {
  return (
    <div
      className={`fixed top-0 z-[1000] left-0 w-full h-[100dvh] flex justify-end ${visible ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none duration-150'}`}
    >
      <div
        className={`bg-black z-[-1] opacity-50 absolute w-full h-[100dvh] transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={toggleStateModal}
      >
        {''}
      </div>
      <div
        className={`bg-white h-[100dvh] overflow-x-scroll transition-all duration-150 p-7 z-10 relative ${visible ? 'w-[80%] sm:w-[60%] lg:w-[40%] pointer-events-auto' : 'w-0 pointer-events-none'}`}
      >
        <X
          size={24}
          color="#fff"
          onClick={toggleStateModal}
          className="bg-black rounded-full p-1 fixed top-[28px] right-[28px] cursor-pointer duration-150 transition-all hover:bg-[#000000c5]"
        />
        {children}
      </div>
    </div>
  )
}

export { StudentInformationModal }
