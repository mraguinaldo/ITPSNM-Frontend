import { SideBar } from './sidebar'
import { MainContent } from './main-content'

const Dashboard = () => {
  return (
    <section className="w-full m-auto relative h-screen bg-[#000]">
      <div className="w-full justify-center flex flex-row bg-black">
        <SideBar />
        <MainContent />
      </div>
    </section>
  )
}

export { Dashboard }
