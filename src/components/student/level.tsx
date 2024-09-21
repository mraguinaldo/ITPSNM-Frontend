interface PropsType {
  level: string
}

const Level = ({ level }: PropsType) => {
  return (
    <span className="font-normal text-[14px] lg:text-[16px] text-[#484848] text-ellipsis overflow-hidden whitespace-nowrap">
      {level}
    </span>
  )
}

export { Level }
