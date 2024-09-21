import { SideBar } from './sidebar'
import { MainContent } from './main-content'

const Dashboard = () => {
  return (
    <section className="w-full max-w-[1366px] m-auto relative bg-[#000]">
      <div className="w-full flex flex-row">
        <SideBar />
        <MainContent />
      </div>
    </section>
  )
}

export { Dashboard }
