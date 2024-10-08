import { Link, useNavigate } from 'react-router-dom'
import { AuthenticatedUser } from '../../components/authenticated-user'
import { NAVIGATION_LINKS } from './data'
import { Check, List, X } from 'phosphor-react'
import { QuestionModal } from '../../components/modals/question'
import { RenderButtons } from './render-button'
import { UseSignOut } from '../../hooks/useSignout'
import { useEffect, useState } from 'react'
import { UsestoreData } from '../../hooks/useStoreData'
import { UseGetData } from '../../hooks/useGetData'
import { UseExtractFirstAndLastName } from '../../hooks/useExtractFirstAndLastName'

const SideBar = ({ employee, role }: { employee: any; role: any }) => {
  const activeLink = UseGetData('activeLink')
  const currentRoute = UseGetData('currentRoute')
  const [menuMobileStatus, setMenuMobileStatus] = useState<boolean>(false)
  const [questionModalState, setQuestionModalState] = useState<boolean>(false)

  const navigate = useNavigate()
  const { signOut } = UseSignOut()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!activeLink) UsestoreData('activeLink', 0)
    if (currentRoute) navigate(currentRoute)
  }, [])

  const handleMenuToggle = () => setMenuMobileStatus((prev) => !prev)

  const renderLinks = (isMobile: boolean) => (
    <nav className={`w-full flex flex-col gap-2 ${isMobile ? '' : 'hidden lg:flex'}`}>
      {NAVIGATION_LINKS.map(({ Icon, content, id, href }) => (
        <Link
          key={id}
          to={href}
          className={`flex gap-4 font-normal px-6 py-4 rounded-md ${activeLink === id ? 'bg-[#F8C40D] text-[#000] font-semibold' : 'text-white hover:opacity-80'}`}
          onClick={() => {
            UsestoreData('activeLink', id)
            UsestoreData('currentRoute', href)
            isMobile && handleMenuToggle()
          }}
        >
          {Icon && <Icon size={24} color={activeLink === id ? '#000' : '#fff'} />}
          {content}
        </Link>
      ))}
    </nav>
  )

  return (
    <>
      <aside className="flex lg:hidden modal z-[2000]">
        <header className="w-full bg-[#1A1C1D] fixed z-[100]">
          <div className="w-full max-w-[1296px] m-auto px-6 flex items-center justify-between h-[78px] lg:h-[96px]">
            <AuthenticatedUser
              fullName={UseExtractFirstAndLastName(employee?.employee?.fullName)}
              userType={role && role === 'ADMIN' ? 'Administrador' : role === 'Teacher' ? 'Professor' : 'Funcionário'}
              avatar="/default.jpeg"
              avatarClassName="border-white"
              className="w-full pointer-events-none"
            />
            <div className="flex lg:hidden">
              {menuMobileStatus ? (
                <X size={24} color="#fff" onClick={handleMenuToggle} className="cursor-pointer" />
              ) : (
                <List size={24} color="#fff" onClick={handleMenuToggle} className="cursor-pointer" />
              )}
            </div>
          </div>
        </header>

        <div
          id="menu-mobile"
          className={`flex lg:hidden fixed left-0 bg-[#1A1C1D] overflow-y-auto transition-all duration-300 h-[calc(100vh-78px)] top-[78px] ${menuMobileStatus ? 'w-full pointer-events-auto' : 'w-0 pointer-events-none'}`}
        >
          <div className="flex flex-col w-full gap-6 px-6 py-10">
            {renderLinks(true)}

            <RenderButtons signOut={() => setQuestionModalState(true)} />
          </div>
        </div>
      </aside>

      <aside className="bg-[#1A1C1D] left-0 hidden lg:flex flex-col items-center justify-between p-5 px-10 py-11 w-full max-w-[344px] h-screen overflow-y-scroll gap-20 fixed scroll-transparent">
        <AuthenticatedUser
          fullName={UseExtractFirstAndLastName(employee?.employee?.fullName)}
          userType={role && role === 'ADMIN' ? 'Administrador' : role === 'Teacher' ? 'Professor' : 'Funcionário'}
          avatar="/default.jpeg"
          avatarClassName="border-white"
          className="w-full pointer-events-none"
        />
        {renderLinks(false)}
        <RenderButtons signOut={() => setQuestionModalState(true)} />
      </aside>

      <QuestionModal
        title="Deseja terminar a sessão?"
        visible={questionModalState}
        iconReject={<X color="#fff" size={24} />}
        iconConfirm={<Check color="#fff" size={24} />}
        reject={() => setQuestionModalState(false)}
        confirm={() => {
          setQuestionModalState(false)
          signOut()
        }}
      />
    </>
  )
}

export { SideBar }
