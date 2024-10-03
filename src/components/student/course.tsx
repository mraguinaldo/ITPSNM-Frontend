interface PropsType {
  course: string
  className?: string
  onClick?: () => void
}

const Course = ({ course, className, onClick }: PropsType) => {
  return (
    <span
      onClick={onClick}
      className={`${className} font-normal text-[14px] lg:text-[16px] text-[#484848] text-ellipsis overflow-hidden whitespace-nowrap`}
    >
      {course}
    </span>
  )
}

export { Course }
