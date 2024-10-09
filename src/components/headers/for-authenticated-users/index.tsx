import { useCallback, useEffect, useState } from 'react'

import { Logo } from '../../logo'
import { AuthenticatedUser } from '../../authenticated-user'
import { StudentOptionsModal } from '../../modals/student/options'
import { STTUDENT_OPTIONS } from './data'
import { SelectedArea } from '../../selected-area'
import { QuestionModal } from '../../modals/question'
import { Check, X } from 'phosphor-react'
import { PasswordUpdateForm } from '../../reset-password'
import { DefaultModal } from '../../modals/default'
import { UseExtractFirstAndLastName } from '../../../hooks/useExtractFirstAndLastName'
import { UseSignOut } from '../../../hooks/useSignout'
import { useNavigate } from 'react-router-dom'

const HeaderForAuthenticatedUsers = ({ student }: { student: any }) => {
  const [modalState, setModalState] = useState<boolean>(false)
  const [questionModalState, setQuestionModalState] = useState<boolean>(false)
  const [modalStateToChangePassword, setModalStateToChangePassword] = useState<boolean>(false)

  const redirectTo = useNavigate()

  const { signOut } = UseSignOut()

  const handleScroll = useCallback(() => setModalState(false), [])

  const handleStudentOptionClick = (content: string, href: string) => {
    setModalState(false)

    const isLogout = content === 'Terminar sessão'
    if (isLogout) {
      return setQuestionModalState(true)
    }
    const openModalToChangePassword = content === 'Senha'

    if (openModalToChangePassword) {
      return setModalStateToChangePassword(true)
    }

    if (href) {
      redirectTo(href)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <header className="w-full fixed z-[100] bg-[#000C13] border-b border-[#f0f0f0]">
      <div className="w-full max-w-[1296px] m-auto px-6 flex items-center justify-between h-[78px]">
        <DefaultModal closeModal={() => setModalStateToChangePassword(false)} display={modalStateToChangePassword}>
          {modalStateToChangePassword && <PasswordUpdateForm email={student?.enrollment?.students?.User?.email} />}
        </DefaultModal>
        <Logo />
        <div className="w-full max-w-[240px] md:max-w-[400px] relative">
          <AuthenticatedUser
            fullName={UseExtractFirstAndLastName(student?.enrollment?.students?.fullName)}
            userType={student ? (student?.enrollment?.students?.type === 'REGULAR' ? 'Normal' : 'Bolseiro') : ''}
            avatar={'/default.jpeg'}
            className="items-center justify-end"
            onClick={() => setModalState((prev) => !prev)}
          />
          <StudentOptionsModal className="right-0 top-20" modalState={modalState}>
            {STTUDENT_OPTIONS.map(({ id, content, Icon, href }) => (
              <SelectedArea
                key={id}
                Icon={<Icon size={24} color="#fff" />}
                area={content}
                onClick={() => handleStudentOptionClick(content, href)}
              />
            ))}
          </StudentOptionsModal>
        </div>
      </div>
      <QuestionModal
        title="Desejas terminar a sessão?"
        visible={questionModalState}
        iconReject={<X color="#fff" size={24} />}
        iconConfirm={<Check color="#fff" size={24} />}
        reject={() => setQuestionModalState(false)}
        confirm={() => {
          setQuestionModalState(false)
          signOut()
        }}
      />
    </header>
  )
}

export { HeaderForAuthenticatedUsers }
