import type { IAreasActivity } from './interface'

const SelectedArea = ({ area, id, onClick }: IAreasActivity) => {
  return (
    <button
      onClick={onClick}
      type="button"
      key={id}
      className="text-[16px] font-normal duration-300 hover:brightness-90 text-white"
    >
      {area}
    </button>
  )
}

export { SelectedArea }
