interface PropsType {
  locked: boolean
}

const State = ({ locked }: PropsType) => {
  return (
    <span
      className={`flex h-8 w-full items-center rounded-[40px] px-4 py-2 font-normal ${
        locked ? 'max-w-[114px] bg-[#ff373723] text-[#FF3737]' : 'max-w-[88px] bg-[#3758ff26] text-[#3757FF]'
      }`}
    >
      {locked ? 'Bloqueado' : 'Normal'}
    </span>
  )
}

export { State }
