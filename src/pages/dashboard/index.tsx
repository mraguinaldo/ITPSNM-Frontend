import { SideBar } from './sidebar'
import { MainContent } from './main-content'
import { UseFetchEnrollments } from '../../hooks/useFetchEnrollments'
import { UseFetchEnrollmentsApproved } from '../../hooks/useFetchEnrollmentsApproved'
import { ProgressBar } from '../../components/progress-bar'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const redirectTo = useNavigate()
  const { data: enrollmentsPending, error: errorWhenGettingPendingEnrollments }: any = UseFetchEnrollments()
  const { data: enrollmentsApproved, error: errorWhenGettingApprovedEnrollments }: any = UseFetchEnrollmentsApproved()
  const messageError = 'Unauthorized: Invalid token'

  if (
    errorWhenGettingPendingEnrollments?.response?.data?.message === messageError ||
    errorWhenGettingApprovedEnrollments?.response?.data?.message === messageError
  ) {
    redirectTo('/login')
  }

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
