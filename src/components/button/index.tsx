import type { IButton } from './interface'

const Button = ({ className, onClick, content, Icon, type }: IButton) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center duration-150 tracking-[0.6px] uppercase rounded-[6px] text-[16px] font-bold bg- ${className ? className : 'bg-[#000C13] h-[78px] p-6 hover:bg-[#011622] text-white hover:text-[#ffffffb4]'}`}
      type={type}
    >
      {Icon && Icon}
      {content}
    </button>
  )
}

export { Button }
