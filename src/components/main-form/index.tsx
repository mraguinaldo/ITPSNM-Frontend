import { useLocation } from 'react-router-dom'
import { Carousel } from '../carousel'
import type { IMainForm } from './interface'
import { useEffect } from 'react'

const MainForm = ({ children, title, allProgress }: IMainForm) => {
  const location = useLocation()

  const { pathname } = location

  useEffect(() => {
    if (pathname) window.scrollTo(0, 0)
  }, [pathname])

  return (
    <section className="py-36">
      <div className="w-full max-w-[1296px] m-auto px-6 flex flex-col xl:flex-row items-start gap-6 justify-between">
        <div className="flex items-center justify-center w-full xl:max-w-[596px] rounded-[6px] xl:sticky xl:top-28">
          <Carousel />
        </div>
        <div className="flex flex-col gap-8 w-full xl:max-w-[566px]">
          {allProgress}
          <div>
            <h2 className="text-[28px] xl:text-[32px] font-medium">{title}</h2>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}

export { MainForm }
