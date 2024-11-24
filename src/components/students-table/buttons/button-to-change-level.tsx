import { IButtonToChangeLevel } from "../interface"

const ButtonToChangeLevel = ({ currentLevelId, id, level, onClick }: IButtonToChangeLevel) => {
  return (
    <button
      key={id}
      type="button"
      className={`text-[14px] uppercase border py-6 px-4 w-full rounded-md  border-[#dcdcdc] ${currentLevelId === id ? 'bg-[#bee7d4] hover:bg-[#bee7d4]' :
        'border-[#dcdcdc00] hover:bg-[#dcdcdc52]'}`}
      onClick={onClick}
    >
      {level}
    </button>
  )
}

export { ButtonToChangeLevel }