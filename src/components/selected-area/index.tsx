import type { IAreasActivity } from './interface'

const SelectedArea = ({ area, onClick, Icon, className }: IAreasActivity) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${className}text-[16px] font-normal duration-300 hover:brightness-90 text-white flex flex-row gap-2`}
    >
      {Icon && Icon}
      {area}
    </button>
  )
}

export { SelectedArea }
