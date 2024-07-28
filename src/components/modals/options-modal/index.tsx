import type { IOptionsModal } from './interface'

const OptionsModal = ({ children, modalState, className }: IOptionsModal) => {
  return (
    <div
      className={`modal ${className} z-40 absolute mt-[-2px] flex w-full flex-col items-start gap-3 overflow-y-scroll rounded-b-[6px] bg-[#F8C40D] px-6 duration-300 ${modalState ? 'h-[200px] py-6' : 'h-0 py-0'}`}
    >
      {children}
    </div>
  )
}

export { OptionsModal }
