import { IButtonOptionsForEmployee } from "./interfaces"

const ButtonOptionsForEmployee = ({ Icon, content, onClick }: IButtonOptionsForEmployee) => {
  return (
    <button
      type="button"
      className="bg-transparent flex gap-2 items-center px-4 py-2 w-full hover:bg-[#9d9d9d56] rounded-md"
      onClick={onClick}
    >
      <Icon size={18} color="#2d2d2d" />
      {content}
    </button>
  )
}

export { ButtonOptionsForEmployee }