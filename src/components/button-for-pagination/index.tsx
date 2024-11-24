import { IButtonForPagination } from "./interface"

const ButtonForPagination = ({ isActive, content, onClick }: IButtonForPagination) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 flex items-center justify-center ${isActive ? 'bg-[#d8a429a9] font-semibold' : 'bg-[#b7b7b73b]'}`}
    >
      {content}
    </button>
  )
}

export { ButtonForPagination }