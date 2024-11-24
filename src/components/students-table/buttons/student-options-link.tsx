import { Link } from "react-router-dom"
import { IStudentOptionsLink } from "../interface"

const StudentOptionsLink = ({ Icon, href, onClick, option }: IStudentOptionsLink) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="text-[14px] flex gap-2 items-center text-[#1c1c1c]"
    >
      <Icon size={14} color="#000" /> {option}
    </Link>
  )
}


export { StudentOptionsLink }