interface PropsType {
  name: string
}

const Name = ({ name }: PropsType) => {
  return <span className="text-ellipsis overflow-hidden whitespace-nowrap">{name}</span>
}

export { Name }
