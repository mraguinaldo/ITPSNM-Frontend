import { IStudentOptionsButton } from "../interface"

const StudentOptionsButton = ({ Icon, isBlocked, onClick, option }: IStudentOptionsButton) => {
  return (
    <button
      type="button"
      className="bg-transparent text-[14px] flex gap-2 items-center text-[#1c1c1c]"
      onClick={onClick}
    >
      <Icon size={14} color="#000" />{' '}
      {option === 'Bloquear' && isBlocked ? 'Desbloquear' : option}
    </button>
  )
}


export { StudentOptionsButton }