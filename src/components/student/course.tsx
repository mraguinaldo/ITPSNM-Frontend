interface PropsType {
  course: string
}

const Course = ({ course }: PropsType) => {
  return <span className="font-normal text-[#484848] text-ellipsis overflow-hidden whitespace-nowrap">{course}</span>
}

export { Course }
