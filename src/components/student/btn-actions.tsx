interface PropsType {
  icon: any
  onClick: () => void
}

const BtnActions = ({ icon, onClick }: PropsType) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 items-center rounded-[40px] border border-[#8F8F8F3D] px-4 py-2 transition-all duration-150 hover:bg-[#bbbbbb3d]"
    >
      {icon && icon}
    </button>
  )
}

export { BtnActions }
