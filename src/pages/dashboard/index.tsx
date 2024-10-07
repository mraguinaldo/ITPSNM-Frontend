import { SideBar } from './sidebar'
import { MainContent } from './main-content'
import { UseFetchEnrollments } from '../../hooks/useFetchEnrollments'
import { UseFetchEnrollmentsApproved } from '../../hooks/useFetchEnrollmentsApproved'
import { ProgressBar } from '../../components/progress-bar'

const Dashboard = () => {
  const { data: enrollmentsPending }: any = UseFetchEnrollments()
  const { data: enrollmentsApproved }: any = UseFetchEnrollmentsApproved()

  if (!enrollmentsApproved || !enrollmentsPending) {
    return <ProgressBar />
  }

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
