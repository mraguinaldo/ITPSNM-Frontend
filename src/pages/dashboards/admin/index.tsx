import { SideBar } from './sidebar'
import { MainContent } from './main-content'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { UseGetEmployee } from '../../../hooks/useGetEmployee'

const AdminDashboard = () => {
  const employeeId = Cookies.get('employeeNumber')
  const role = Cookies.get('role')
  const { mutate: useGetEmployee, data: employee } = UseGetEmployee()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (employeeId) useGetEmployee(employeeId)
  }, [])

  if (!employee) {
    return (
      <h1 className="text=[24px] md:text-[32px] font-semibold justify-center flex items-center h-dvh">
        ...
      </h1>
    )
  }

  return (
    <section className="w-full m-auto relative h-screen bg-[#000]">
      <div className="w-full justify-center flex flex-row bg-black">
        <SideBar employee={employee} role={role} />
        <MainContent />
      </div>
    </section>
  )
}

export { AdminDashboard }
