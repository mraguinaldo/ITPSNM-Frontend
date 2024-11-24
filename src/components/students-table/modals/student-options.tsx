import type { ReactNode } from 'react'

interface IStudentOptionModal {
  isVisible: boolean
  children: ReactNode
}

const StudentOptionsModal = ({ isVisible, children }: IStudentOptionModal) => {
  return (
    <td
      className={`modal z-40 absolute flex w-fit flex-col items-start gap-1 overflow-auto rounded-[6px] bg-[#d6d7d7a5] backdrop-filter backdrop-blur-md px-3 duration-200 right-0 top-[54px] ${isVisible ? 'h-fit py-3' : 'h-0 py-0'}`}
    >
      {children}
    </td>
  )
}

export { StudentOptionsModal }
