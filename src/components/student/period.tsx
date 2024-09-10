interface PropsType {
  period: string
}

const Period = ({ period }: PropsType) => {
  return <span className="font-normal text-[#484848] text-ellipsis overflow-hidden whitespace-nowrap">{period}</span>
}

export { Period }
