interface PropsType {
  course: string
  className?: string
}

const Course = ({ course, className }: PropsType) => {
  return (
    <span
      className={`${className} font-normal text-[14px] lg:text-[16px] text-[#484848] text-ellipsis overflow-hidden whitespace-nowrap`}
    >
      {course}
    </span>
  )
}

export { Course }
