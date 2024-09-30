import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const MainContent = () => {
  const location = useLocation()

  const { pathname } = location

  useEffect(() => {
    if (pathname) window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div
      id="main_content"
      className="w-full lg:ml-[calc(344px+14px)] overflow-x-scroll over lg:pr-4 py-0 lg:py-11 mt-[78px] lg:mt-0"
    >
      <Outlet />
    </div>
  )
}

export { MainContent }
