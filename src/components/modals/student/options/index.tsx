import type { IOptionsModal } from './interface'

const StudentOptionsModal = ({ children, modalState, className }: IOptionsModal) => {
  return (
    <div
      className={`modal ${className} z-[400] absolute mt-[-2px] flex w-fit flex-col items-start gap-3 overflow-y-scroll rounded-[6px] bg-[#000c136c] backdrop-filter backdrop-blur-md px-6 duration-200 ${modalState ? 'h-fit py-6' : 'h-0 py-0'}`}
    >
      {children}
    </div>
  )
}

export { StudentOptionsModal }
