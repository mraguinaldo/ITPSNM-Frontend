import { useEffect, useState, useCallback } from 'react'
import { UseExtractFirstAndLastName } from '../../hooks/useExtractFirstAndLastName'
import { AuthenticatedUser } from './authenticated-user'
import { Logo } from '../logo'
import { StudentOptionsModal } from '../modals/student/options'
import { SelectedArea } from '../selected-area'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../toast'
import { STTUDENT_OPTIONS } from './data'
import { UseGetData } from '../../hooks/useGetData'
import { FAKEUSERS } from '../../utils'

const HeaderForAuthenticatedUsers = () => {
  const navigate = useNavigate()
  const [authenticatedUser, setAuthenticatedUser] = useState<any>()
  const [nameExtracted, setNameExtracted] = useState<string>('')
  const [modalState, setModalState] = useState<boolean>(false)

  const handleScroll = useCallback(() => setModalState(false), [])

  const fetchUserData = useCallback(() => {
    const loginData: { email: string; password: string } = UseGetData('LoginData')
    const { email, password } = loginData

    const user = FAKEUSERS.find((user) => user.email === email && user.password === password)

    if (user) {
      setAuthenticatedUser(user)

      const fullName = UseExtractFirstAndLastName(user?.userName)
      if (fullName) setNameExtracted(fullName)
    } else {
      navigate('/login')
    }
  }, [navigate])

  useEffect(() => {
    fetchUserData()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fetchUserData, handleScroll])

  const handleStudentOptionClick = (content: string, href: string) => {
    const isLogout = content === 'Terminar sessão'

    if (isLogout) {
      Toast({ message: 'Sessão Terminada', theme: 'light', toastType: 'success' })
      localStorage.setItem('LoginData', '')
    }
    navigate(href)
  }

  const toggleModalState = () => setModalState((prevState) => !prevState)

  return (
    <header className="w-full fixed z-[100] bg-[#000C13] border-b border-[#f0f0f0]">
      <div className="w-full max-w-[1296px] m-auto px-6 flex items-center justify-between h-[78px]">
        <Logo />
        <div className="w-full max-w-[240px] md:max-w-[400px] relative">
          <AuthenticatedUser
            fullName={nameExtracted}
            studentType={authenticatedUser?.userType || ''}
            avatar="/men-00.png"
            onClick={toggleModalState}
            onMouseEnter={() => setModalState(true)}
          />
          <StudentOptionsModal className="right-0 top-20" modalState={modalState}>
            {STTUDENT_OPTIONS.map(({ id, content, Icon, href }) => (
              <SelectedArea
                key={id}
                id={id}
                Icon={<Icon size={24} color="#fff" />}
                area={content}
                onClick={() => handleStudentOptionClick(content, href)}
              />
            ))}
          </StudentOptionsModal>
        </div>
      </div>
    </header>
  )
}

export { HeaderForAuthenticatedUsers }
