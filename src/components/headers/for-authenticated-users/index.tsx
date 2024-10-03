import { useCallback, useContext, useEffect, useState } from 'react'

import { Toast } from '../../toast'
import { Logo } from '../../logo'
import { AuthenticatedUser } from '../../authenticated-user'
import { StudentOptionsModal } from '../../modals/student/options'
import { STTUDENT_OPTIONS } from './data'
import { SelectedArea } from '../../selected-area'
import { QuestionModal } from '../../modals/question'
import { Check, X } from 'phosphor-react'
import { PasswordUpdateForm } from '../../reset-password'
import { DefaultModal } from '../../modals/default'
import { UseCheckEnrollment } from '../../../hooks/useCheckEnrollment'
import { ApplicationContexts } from '../../contexts/applicationContexts'
import { UseExtractFirstAndLastName } from '../../../hooks/useExtractFirstAndLastName'

const HeaderForAuthenticatedUsers = () => {
  const [modalState, setModalState] = useState<boolean>(false)
  const [questionModalState, setQuestionModalState] = useState<boolean>(false)
  const [modalStateToChangePassword, setModalStateToChangePassword] = useState<boolean>(false)
  const { enrollmentNumber }: any = useContext(ApplicationContexts)

  const { data: user, mutate } = UseCheckEnrollment()

  const handleScroll = useCallback(() => setModalState(false), [])

  const handleStudentOptionClick = (content: string, href: string) => {
    setModalState(false)

    const isLogout = content === 'Terminar sessão'
    if (isLogout) {
      return setQuestionModalState(true)
    }
    const openModalToChangePassword = content === 'Atualizar Senha'

    if (openModalToChangePassword) {
      setModalStateToChangePassword(true)
    }

    console.log(href)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams({
      [enrollmentNumber && 'enrollmentNumber']: enrollmentNumber?.id,
    })
    mutate(searchParams)
  }, [mutate, enrollmentNumber])

  const signOut = () => {
    setQuestionModalState(false)
    Toast({ message: 'Sessão Terminada', theme: 'light', toastType: 'success' })
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
          <PasswordUpdateForm />
        </DefaultModal>
        <Logo />
        <div className="w-full max-w-[240px] md:max-w-[400px] relative">
          {user && (
            <AuthenticatedUser
              fullName={UseExtractFirstAndLastName(user.enrollment.students.fullName)}
              userType={user.enrollment.students.type}
              avatar={'/default.jpeg'}
              className="items-center justify-end"
              onClick={() => setModalState((prev) => !prev)}
              onMouseEnter={() => setModalState(true)}
            />
          )}
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
        confirm={signOut}
      />
    </header>
  )
}

export { HeaderForAuthenticatedUsers }
