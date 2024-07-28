import { FOOTER_DATA } from './data'

const FooterData = () => {
  return (
    <div className="border-b-2 border-[#F4F4F4] pb-6 flex gap-11 items-start justify-between flex-wrap">
      {FOOTER_DATA.map(({ id, title, children }) => (
        <div key={id} className="flex flex-col gap-5 w-fit">
          <h4 className="font-semibold uppercase">{title}</h4>
          <nav className="flex gap-3 flex-col">
            {children.map(({ id, content, Icon, target, element }) => (
              <a
                key={id}
                href={target && target}
                className={`flex gap-1 items-center text-[#2F2F2F] font-medium ${element === 'email' ? 'bg-[#F8C40D] rounded-[6px] p-3' : 'bg-transparent'}`}
              >
                {Icon && <Icon weight="duotone" size={18} color="#202020" />} {content}
              </a>
            ))}
          </nav>
        </div>
      ))}
    </div>
  )
}

export { FooterData }
