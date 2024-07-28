import type { IButton } from './interface'

const Button = ({ className, onClick, content, Icon, type }: IButton) => {
  return (
    <button
      onClick={onClick}
      className={` w-full tracking-[0.6px] uppercase rounded-[6px] text-[16px] font-bold bg- ${className ? className : 'bg-[#F8C40D] py-4 px-6 '}`}
      type={type}
    >
      {Icon && Icon}
      {content}
    </button>
  )
}

export { Button }
