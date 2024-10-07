import type { IOptionsModal } from './interface'

const OptionsModal = ({ children, modalState, className, maximumHeight }: IOptionsModal) => {
  return (
    <div
      className={`modal ${className} z-40 absolute mt-[-2px] flex w-full flex-col items-start gap-3 overflow-y-scroll rounded-b-[6px] bg-[#000C13] px-6 duration-300 ${modalState ? `${maximumHeight ? 'h-[260px]' : 'h-fit'} py-6` : 'h-0 py-0 left'}`}
    >
      {children}
    </div>
  )
}

export { OptionsModal }
