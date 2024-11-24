interface IButtonToChooseThePeriod {
  option: boolean,
  content: string,
  onClick: () => void
}

const ButtonToChooseThePeriod = ({ content, onClick, option }: IButtonToChooseThePeriod) => {
  return (
    <button
      type="button"
      className={`text-[14px] uppercase border py-2 px-4 w-full rounded-md  border-[#dcdcdc] ${option ? 'bg-[#bee7d4] hover:bg-[#bee7d4]' : 'border-[#dcdcdc00] hover:bg-[#dcdcdc52]'}`}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

export { ButtonToChooseThePeriod }