import { Student } from '../student'
import { initialValues, ROLES, tableHeader } from './data'
import { ArrowLeft, CaretDown, MagnifyingGlass } from 'phosphor-react'
import { OptionsModal } from '../modals/options-modal'
import { useEffect, useReducer } from 'react'
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

const UsersTable = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)

  const { data: users, isLoading: isLoadingUsers }: any = UseFetchUsers(state.currentRole.role)
  const { mutate: blockStudent, isLoading: blockingTheStudent } = UseBlockStudent('users')

  const {
    mutate: catchUser,
    data: userFound,
    isLoading: isLoadingUser,
    isSuccess: userSeen,
    isError: userNotFound,
    reset: resetUserFound,
  }: any = UseCatchUser()

  const {
    mutate: resetPassword,
    isLoading: isResettingPassword,
    isSuccess: passwordRestored,
    isError: passwordNotRestored,
  }: any = UseResetPassword()

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
    } else if (passwordNotRestored) {
      Toast({ message: 'Falha ao restaurar a senha', theme: 'colored', toastType: 'error' })
    }
  }, [passwordRestored, passwordNotRestored])

  if (isLoadingUsers) return <ProgressBar />

  const fetchUser = (e: any) => {
    if (e.key === 'Enter') {
      catchUser({ email: state.currentEmail })
    }
  }

  const renderStudentRow = (user: any) =>
    user && (
      <Student.Root className="mb-4" key={user.id}>
        <td className="p-4 text-left">
          <Student.Name name={user.email} />
        </td>
        <td className="p-4 text-left">
          <Student.Course course={user.email} />
        </td>
        <td className="p-4 text-center">
          <Student.Course
            course={
              user.role === 'STUDENT'
                ? 'Estudante'
                : user.role === 'EMPLOYEE'
                  ? 'Funcionário'
                  : user.role === 'TEACHER'
                    ? 'Professor'
                    : 'Administrador'
            }
          />
        </td>
        <td className="p-4 text-center flex justify-center items-center">
          <Student.Course
            course={user.isActive ? 'Ativa' : 'Desativada'}
            className={`hover:brightness-50 duration-150 flex items-center justify-center rounded-[38px] w-full max-w-[140px] py-2 font-semibold ${user.isActive ? 'bg-[#3dd0899f] ' : 'bg-[#d0553d9f] '}`}
          />
        </td>
        <td className="p-4 text-center">
          <Student.Course
            course={user.loginAttempt}
            className={`font-semibold ${user.loginAttempt > 3 && 'text-[#d0553d9f] '}`}
          />
        </td>
        <td
          className="p-4 text-center flex justify-center items-center"
          onClick={() => blockStudent({ formData: { email: user.email, status: !user.isBlocked } })}
        >
          <Student.State locked={user.isBlocked} />
        </td>
        <td className="p-4 text-center">
          <Student.Course
            onClick={() => resetPassword({ formData: { email: user.email } })}
            course={'Resetar'}
            className="hover:bg-[#d1d1d140] duration-150 flex items-center justify-center border border-[#a7a7a755] text-black rounded-[38px] py-2 px-6"
          />
        </td>
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
            <div className="relative w-full max-w-[180px] mt-4 h-[68px]">
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
      <div
        className={`w-full overflow-x-scroll h-fit lg:overflow-y-scroll scroll-transparent ${state.signupFormStatus ? 'hidden' : 'flex flex-col'}`}
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
            {userFound ? renderStudentRow(userFound.user) : users && (users.users.items || []).map(renderStudentRow)}
          </tbody>
        </table>
        {users.users.items.length <= 0 && (
          <h1 className="w-full h-64 flex items-center justify-center text-[24px] sm:text-[32px] font-semibold">
            Sem {state.currentRole.content}
          </h1>
        )}
      </div>
    </section>
  )
}

export { UsersTable }
