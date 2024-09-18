import { FOOTER_DATA } from './data'

const FooterData = () => {
  return (
    <div className="border-b border-[#f4f4f45f] pb-6 flex gap-11 items-start justify-between flex-wrap">
      {FOOTER_DATA.map(({ id, title, children }) => (
        <div key={id} className="flex flex-col gap-5 w-fit">
          <h4 className="font-semibold uppercase text-white">{title}</h4>
          <nav className="flex gap-3 flex-col">
            {children.map(({ id, content, Icon, target, element }) => (
              <a
                key={id}
                href={target && target}
                className={`flex gap-1 duration-150 items-center font-light ${element === 'email' ? 'bg-[#F8C40D] rounded-[6px] font-semibold p-3 text-[#000]' : 'bg-transparent text-[#989292] hover:text-[#9892929a]'}`}
              >
                {Icon && <Icon weight="duotone" size={18} color={element === 'email' ? '#000' : '#F8C40D'} />} {content}
              </a>
            ))}
          </nav>
        </div>
      ))}
    </div>
  )
}

export { FooterData }
