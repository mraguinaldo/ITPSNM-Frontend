interface PropsType {
  name: string
}

const Name = ({ name }: PropsType) => {
  return <span className="text-ellipsis text-[14px] lg:text-[16px] overflow-hidden whitespace-nowrap">{name}</span>
}

export { Name }
