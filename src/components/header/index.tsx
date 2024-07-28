import { CaretRight, List, Question, X } from 'phosphor-react'
import { useState } from 'react'
import { Button } from '../button'
import { MENU } from './data'

const Header = () => {
  const [menuMobileStatus, setMenuMobileStatus] = useState<boolean>(false)
  return (
    <header className="w-full bg-[#F8C40D] fixed z-50">
      <div className="w-full max-w-[1296px] m-auto px-6 flex items-center justify-between h-16">
        <div className="flex gap-6 items-center">
          <a href="/" id="logo">
            <img src="/Logo.png" alt="logo" />
          </a>
          <nav className="hidden gap-3 items-center md:flex">
            {MENU.map(({ id, content, target, Icon }) => (
              <a key={id} href={target} className="flex gap-2 duration-100 items-center font-medium hover:text-[#fff]">
                {content} {Icon && <Icon size={24} className="hover:text-white duration-75" />}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden gap-7 items-center lg:flex">
          <a href="/" className="flex gap-2 items-center font-medium">
            Ajuda <Question size={24} color="#202020" />
          </a>
          <Button className="bg-white py-2 px-7" content="Entrar" type="button" onClick={() => alert('Clicou')} />
        </div>
        <div className="flex lg:hidden">
          {menuMobileStatus ? (
            <X
              size={24}
              color="#202020"
              onClick={() => setMenuMobileStatus((prev) => !prev)}
              className="cursor-pointer"
            />
          ) : (
            <List
              size={24}
              color="#202020"
              onClick={() => setMenuMobileStatus((prev) => !prev)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      <div
        className={`flex lg:hidden fixed left-0 bg-[#F8C40D] overflow-x-scroll transition-all duration-300 h-screen ${menuMobileStatus ? 'w-full pointer-events-auto' : 'w-0 pointer-events-none'}`}
      >
        <div className="flex flex-col w-full gap-6 px-6 py-10">
          <nav className="flex flex-col w-full gap-4">
            {MENU.map(({ id, content, target }) => (
              <a key={id} href={target} className="flex gap-2 items-center uppercase justify-between font-medium">
                {content} <CaretRight size={24} color="#202020" />
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-9">
            <Button className="bg-white py-6 px-7" content="Entrar" type="button" onClick={() => alert('Clicou')} />
            <a href="/" className="flex gap-2 items-center font-medium">
              Ajuda <Question size={24} color="#202020" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export { Header }
