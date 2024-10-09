import { Student } from '../student'
import { initialValues, ROLES, tableHeader, USER_OPTIONS } from './data'
import { ArrowLeft, CaretDown, DotsThree, MagnifyingGlass, X } from 'phosphor-react'
import { OptionsModal } from '../modals/options-modal'
import { useEffect, useReducer, useState } from 'react'
import { SelectedArea } from '../selected-area'
import { UseFetchUsers } from '../../hooks/useFetchUsers'
import { ProgressBar } from '../progress-bar'
import { Signup } from '../signup'
import { InputSearch } from '../inputs/search'
import { UseBlockStudent } from '../../hooks/useBlockStudent'
import { reducer } from './reducer'
import { actions } from './actions'
import { UseCatchUser } from '../../hooks/useCatchUser'
import { UseResetPassword } from '../../hooks/useResetPassword'
import { Toast } from '../toast'
import { Link } from 'react-router-dom'
import { UsestoreData } from '../../hooks/useStoreData'
import { StudentOptionsModal } from '../students-table/modals/student-options'
import { PasswordUpdateForm } from '../reset-password'
import { DefaultModal } from '../modals/default'

const UsersTable = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch,
  }: any = UseFetchUsers(state.currentRole.role, currentPage)
  const { mutate: blockStudent, isLoading: blockingTheStudent } = UseBlockStudent('users')

  const {
    mutate: catchUser,
    data: userFound,
    isLoading: isLoadingUser,
    isSuccess: userSeen,
    isError: userNotFound,
    reset: resetUserFound,
  }: any = UseCatchUser()

  const { mutate: resetPassword, isLoading: isResettingPassword, isSuccess: passwordRestored }: any = UseResetPassword()

  useEffect(() => {
    if (userSeen) {
      dispatch({ type: actions.toggleEmail, payload: '' })
    }
  }, [userSeen])

  useEffect(() => {
    if (userNotFound) {
      Toast({ message: 'Usuário não encontrado', theme: 'colored', toastType: 'error' })
    }
  }, [userNotFound])

  useEffect(() => {
    if (passwordRestored) {
      Toast({ message: 'Senha restaurada com sucesso', theme: 'light', toastType: 'success' })
    }
  }, [passwordRestored])

  useEffect(() => {
    if (currentPage) refetch()
  }, [currentPage, refetch])

  if (isLoadingUsers) return <ProgressBar />

  const fetchUser = (e: any) => {
    if (e.key === 'Enter') {
      catchUser({ email: state.currentEmail })
    }
  }



  const handleStudentClick = (user: string) => {
    dispatch({ type: actions.changeSelectedUser, payload: state.selectedUser === user ? '' : user })
  }

  const changePassword = (email: string) => {
    dispatch({ type: actions.toggleEmail, payload: email })
    dispatch({ type: actions.changeModalStateToChangePassword, payload: true })
  }

  const renderStudentRow = (user: any) =>
    user && (
      <Student.Root className="mb-4" key={user.id}>
        <td className="p-4 text-left">
          <Student.Course course={user?.email} />
        </td>
        <td className="p-4 text-center">
          <Student.Course
            course={
              user?.role === 'STUDENT'
                ? 'Estudante'
                : user?.role === 'EMPLOYEE'
                  ? 'Funcionário'
                  : user?.role === 'TEACHER'
                    ? 'Professor'
                    : 'Administrador'
            }
          />
        </td>
        <td className="p-4 text-center">
          <Student.Course
            course={user?.loginAttempt}
            className={`font-semibold ${user?.loginAttempt > 3 && 'text-[#d0553d9f] '}`}
          />
        </td>
        <td
          className="p-4 text-center flex justify-center items-center"
          onClick={() => blockStudent({ formData: { email: user?.email, status: !user?.isBlocked } })}
        >
          <Student.State locked={user?.isBlocked} />
        </td>
        <td className="p-4 text-center">
          <Student.Course
            onClick={() => resetPassword({ formData: { email: user?.email } })}
            course={'Resetar'}
            className="hover:bg-[#d1d1d140] duration-150 flex items-center justify-center border border-[#a7a7a755] text-black rounded-[38px] py-2 px-6"
          />
        </td>
        <th className="text-center p-3 w-[68px]">
          <Student.BtnActions
            icon={
              state.selectedUser === user?.id ? (
                <X color="#161616" size={14} className="w-[48px]" />
              ) : (
                <DotsThree color="#161616" size={32} className="w-[48px]" />
              )
            }
            onClick={() => handleStudentClick(user?.id)}
          />
        </th>
        <StudentOptionsModal isVisible={state.selectedUser === user?.id}>
          {USER_OPTIONS.map(({ Icon, id, option, href }) =>
            href ? (
              <Link
                to={href}
                key={id}
                onClick={() => {
                  UsestoreData('chosenStudent', '')
                  UsestoreData('previousRoute', location.pathname)
                }}
                className="text-[14px] flex gap-2 items-center text-[#1c1c1c]"
              >
                <Icon size={14} color="#000" /> {option}
              </Link>
            ) : (
              <button
                type="button"
                key={id}
                className="bg-transparent text-[14px] flex gap-2 items-center text-[#1c1c1c]"
                onClick={() => {
                  option === 'Alterar senha' && changePassword(user?.email)
                  handleStudentClick(user?.id)
                }}
              >
                <Icon size={14} color="#000" /> {option}
              </button>
            ),
          )}
        </StudentOptionsModal>
      </Student.Root>
    )
  return (
    <section className="w-full pl-4 pt-16 lg:py-11 lg:rounded-[16px] bg-white sm:h-dvh flex flex-col gap-4">
      {(isLoadingUser || blockingTheStudent || isResettingPassword) && <ProgressBar />}

      <div className="flex items-center justify-between flex-wrap gap-5 w-full pr-4">
        <button
          type="button"
          onClick={() => dispatch({ type: actions.displaySignupModal, payload: !state.signupFormStatus })}
          className="bg-[#000] text-[14px] sm:text-[16px] text-white font-semibold py-3 px-6 rounded-[32px] uppercase hover:brightness-50 duration-150 "
        >
          {state.signupFormStatus ? <ArrowLeft size={16} weight="bold" color="#fff" /> : 'Criar usuário'}
        </button>
        {!state.signupFormStatus && (
          <>
            <div id="search__area" className="flex flex-col items-center relative w-full lg:max-w-[316px]">
              <InputSearch
                placeholder={`Pesquisar ${state.currentRole.content.toLowerCase()} pelo email...`}
                className="flex-row-reverse"
                icon={
                  <MagnifyingGlass
                    id="search-icon"
                    className="cursor-pointer p-1 hover:bg-slate-200 rounded-full flex items-center justify-center"
                    color="#000000"
                    size={24}
                    onClick={() => catchUser({ email: state.currentEmail })}
                  />
                }
                value={state.currentEmail}
                onKeyDown={(e: any) => fetchUser(e)}
                onChange={(e: any) => dispatch({ type: actions.toggleEmail, payload: e.currentTarget.value })}
              />

              {userFound && (
                <button
                  type="button"
                  onClick={() => resetUserFound()}
                  className="absolute top-12 text-[14px] text-[#898989] py-2 px-4 rounded-3xl hover:bg-[#d1d1d140]"
                >
                  Exibir todos...
                </button>
              )}
            </div>
            <div className="relative w-full max-w-[200px] mt-4 h-[68px]">
              <button
                type="button"
                className="text-[#1E1E1E] w-full py-3 px-6 bg-[#F4F4F4] flex gap-2 rounded-[50px] items-center font-semibold justify-between cursor-pointer text-[14px] sm:text-[16px] absolute z-50"
                onClick={() => dispatch({ type: actions.toggleModalState, payload: !state.modalState })}
              >
                {state.currentRole.content}
                <CaretDown
                  size={18}
                  color="#2F2F2F"
                  className={`duration-100 cursor-pointer ${state.modalState ? 'rotate-[-180deg]' : 'rotate-0'}`}
                />
              </button>
              <OptionsModal
                className={`top-8 overflow-x-hidden ${state.modalState ? 'pt-8 opacity-100' : 'pt-0 opacity-0'}`}
                modalState={state.modalState}
              >
                {ROLES.map(({ id, role, content }) => (
                  <SelectedArea
                    key={id}
                    area={content}
                    onClick={() => {
                      dispatch({ type: actions.toggleModalState, payload: false })
                      dispatch({ type: actions.modifyRole, payload: { role, content } })
                    }}
                  />
                ))}
              </OptionsModal>
            </div>
          </>
        )}
      </div>

      <Signup visible={state.signupFormStatus} />

      <DefaultModal
        closeModal={() => dispatch({ type: actions.changeModalStateToChangePassword, payload: false })}
        display={state.modalStateToChangePassword}
      >
        <PasswordUpdateForm email={state.currentEmail} />
      </DefaultModal>

      {!state.signupFormStatus && (
        <div id="about__contacts" className="flex flex-col gap-3">
          <h1 className="text-[20px] lg:text-[24px] font-semibold leading-9">
            Total De Usuários {state.currentRole.content} ( {users?.users?.items?.length} )
          </h1>
        </div>
      )}

      <div
        className={`w-full overflow-x-scroll h-fit pb-10 scroll-transparent ${state.signupFormStatus ? 'hidden' : 'flex flex-col'}`}
      >
        <table className="w-full pt-20 scroll-transparent">
          <thead>
            <tr className="border-b border-[#E8E8E8]">
              {tableHeader.map(({ id, content }) => (
                <th
                  colSpan={1}
                  className={`w-auto p-3 font-medium text-[14px] uppercase text-[#363636] whitespace-nowrap overflow-x-hidden ${content === 'Nome' || content === 'E-mail' ? 'text-left' : 'text-center'}`}
                  key={id}
                >
                  {content}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="w-full scroll-transparent">
            {userFound ? renderStudentRow(userFound?.user) : users && (users?.users?.items || []).map(renderStudentRow)}
          </tbody>
        </table>
        {!userFound && users?.users?.items?.length <= 0 && (
          <h1 className="w-full h-64 flex items-center justify-center text-[24px] sm:text-[32px] font-semibold">
            Sem {state.currentRole.content}
          </h1>
        )}
      </div>
      {!state.signupFormStatus && (
        <div className="flex gap-2 flex-wrap w-full">
          {Array.from({ length: users?.users?.totalPages }, (_, index: number) => (
            <button
              type="button"
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-lg px-4 py-2 flex items-center justify-center ${currentPage === index + 1 ? 'bg-[#d8a429a9] font-semibold' : 'bg-[#b7b7b73b]'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export { UsersTable }
