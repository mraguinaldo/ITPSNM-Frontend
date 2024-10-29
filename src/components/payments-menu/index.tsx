import { Link } from 'react-router-dom'
import { NAVIGATION_LINKS } from './data'
import { UsestoreData } from '../../hooks/useStoreData'

const PaymentsMenu = () => {
  return (
    <section
      className={'w-full duration-300 flex gap-9 h-fit px-6 py-6 pt-16 lg:py-11 lg:rounded-[16px] bg-white flex-col justify-center'}
    >
      <nav className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {NAVIGATION_LINKS.map(({ Icon, content, id, href }) => (
          <Link
            key={id}
            to={href}
            onClick={() => UsestoreData('currentRoute', href)}
            className='flex flex-col justify-center border-[2px] gap-4 font-normal px-6 py-4 rounded-md hover:bg-[#dcdcdc52] border-[#dcdcdc] border-dashed h-56 uppercase tracking-[4px] w-full'
          >
            {Icon && <Icon size={24} color={'#000'} />}
            {content}
          </Link>
        ))}
      </nav>
    </section>
  )
}

export { PaymentsMenu }
