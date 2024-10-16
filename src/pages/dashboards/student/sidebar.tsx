import { Link } from 'react-router-dom'
import { NAVIGATION_LINKS } from './data'

const StudentSideBar = () => {
  return (
    <nav className="w-full max-w-[1080px] m-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 py-40">
      {NAVIGATION_LINKS.map(({ Icon, content, id, href }) => (
        <Link
          key={id}
          to={href}
          className='flex flex-col justify-center border-[2px] gap-4 font-normal px-6 py-4 rounded-md hover:bg-[#dcdcdc52] border-[#dcdcdc] border-dashed h-56 uppercase tracking-[4px]'
        >
          {Icon && <Icon size={24} color={'#000'} />}
          {content}
        </Link>
      ))}
    </nav>
  )
}

export { StudentSideBar }
