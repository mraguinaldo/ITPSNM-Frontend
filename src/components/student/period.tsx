interface PropsType {
  period: string
}

const Period = ({ period }: PropsType) => {
  return (
    <span className="font-normal text-[14px] lg:text-[16px] text-[#484848] text-ellipsis overflow-hidden whitespace-nowrap">
      {period}
    </span>
  )
}

export { Period }
