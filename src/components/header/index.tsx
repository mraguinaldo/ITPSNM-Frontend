import { CaretRight, List, Question, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Button } from '../button'
import { MENU } from './data'
import { Logo } from '../logo'

const Header = () => {
  const [menuMobileStatus, setMenuMobileStatus] = useState<boolean>(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <header className="w-full bg-[#000C13] fixed z-[100]">
      <div className="w-full max-w-[1296px] m-auto px-6 flex items-center justify-between h-[68px] lg:h-[96px]">
        <div className="flex gap-6 items-center">
          <Logo />
          <nav className="hidden gap-8 items-center md:flex">
            {MENU.map(({ id, content, target, Icon }) => (
              <a
                key={id}
                href={target}
                className="flex text-white gap-2 duration-100 items-center font-normal hover:text-[#ffffffb1]"
              >
                {content} {Icon && <Icon size={24} className="hover:text-[#ABA7A7] duration-75" />}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden gap-7 items-center lg:flex">
          <a href="/" className="flex gap-2 items-center font-medium text-[#fff]">
            Ajuda <Question size={24} color="#fff" />
          </a>
          <Button
            className="bg-[#F8C40D] text-black py-2 px-7 duration-100 hover:bg-[#f8c50dde]"
            content="Entrar"
            type="button"
            onClick={() => alert('Clicou')}
          />
        </div>
        <div className="flex lg:hidden">
          {menuMobileStatus ? (
            <X size={24} color="#fff" onClick={() => setMenuMobileStatus((prev) => !prev)} className="cursor-pointer" />
          ) : (
            <List
              size={24}
              color="#fff"
              onClick={() => setMenuMobileStatus((prev) => !prev)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      <div
        className={`flex lg:hidden fixed left-0 bg-[#000C13] overflow-x-scroll transition-all duration-300 h-screen ${menuMobileStatus ? 'w-full pointer-events-auto' : 'w-0 pointer-events-none'}`}
      >
        <div className="flex flex-col w-full gap-6 px-6 py-10">
          <nav className="flex flex-col w-full gap-4">
            {MENU.map(({ id, content, target }) => (
              <a
                key={id}
                href={target}
                className="flex gap-2 items-center uppercase justify-between font-normal text-[#AFAFAF]"
              >
                {content} <CaretRight size={24} color="#AFAFAF" />
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-9">
            <Button className="bg-white py-6 px-7" content="Entrar" type="button" onClick={() => alert('Clicou')} />
            <a href="/" className="flex gap-2 items-center font-medium text-white">
              Ajuda <Question size={24} color="#fff" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export { Header }
