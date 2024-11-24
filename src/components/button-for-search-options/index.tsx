import { IButtonForSearchOptions } from "./interface"

const ButtonForSearchOptions = ({ content, onClick, option, searchType }: IButtonForSearchOptions) => {
  return (
    <button
      type="button"
      className={`text-[12px] uppercase border py-2 px-4 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc] ${option ? 'border-[#dcdcdc]' : 'border-[#dcdcdc00]'} ${searchType ? 'hidden' : 'flex'}
      `}
      onClick={onClick}
    >
      {content}
    </button>
  )
}

export { ButtonForSearchOptions }