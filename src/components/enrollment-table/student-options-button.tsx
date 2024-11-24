interface IStudentOptionsButton {
  onClick: () => void,
  option: string,
  Icon: any,
  isVisible: boolean
}

const StudentOptionsButton = ({ Icon, onClick, option, isVisible }: IStudentOptionsButton) => {
  return (
    <button
      type="button"
      className={`bg-transparent text-[14px] flex gap-2 items-center text-[#1c1c1c] 
        ${isVisible ? 'hidden' : 'flex'}`}
      onClick={onClick}
    >
      <Icon size={14} color="#000" />{' '}
      {option}
    </button>
  )
}


export { StudentOptionsButton }