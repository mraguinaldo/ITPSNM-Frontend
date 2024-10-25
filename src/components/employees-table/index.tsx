import { useEffect, useReducer, useState } from 'react'
import { UseGetEmployees } from '../../hooks/useGetEmployees'
import { ProgressBar } from '../progress-bar'
import { actions } from './actions'
import { initialValues, tableHeader } from './data'
import { FormToRegisterEmployee } from './form'
import { HeadLine } from './headline'
import { Property } from './property'
import { reducer } from './reducer'
import { ArrowLeft, MagnifyingGlass, Pen, Trash } from 'phosphor-react'
import { InputSearch } from '../inputs/search'
import { UseGettMaritalStatus } from '../../hooks/useGetMaritalStatus'
import { UseformatDate } from '../../hooks/useFormatDate'
import { DefaultModal } from '../modals/default'
import { Link } from 'react-router-dom'
import { UsestoreData } from '../../hooks/useStoreData'
import { UseGetEmployee } from '../../hooks/useGetEmployee'
import { Toast } from '../toast'

const EmployeesTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: employees, isLoading, refetch }: any = UseGetEmployees(currentPage)
  const {
    data: employee,
    mutate: useGetEmployee,
    error: employeeNotFound,
    reset: resetEmployeeFound,
    isLoading: lookingForTheEmployee,
  }: any = UseGetEmployee()
  const [state, dispatch] = useReducer(reducer, initialValues)
  const [employeeId, setEmployeeId] = useState<any>()

  useEffect(() => {
    if (currentPage) refetch()
  }, [currentPage, refetch])

  const searchEmployee = () => {
    useGetEmployee(employeeId)
  }

  const fetchUser = (e: any) => {
    if (e.key === 'Enter') searchEmployee()
  }

  useEffect(() => {
    if (employeeNotFound) {
      Toast({ message: 'Funcionário não encontrado', theme: 'colored', toastType: 'error' })
    }
    if (employee) {
      !employee?.employee && Toast({ message: 'Funcionário não encontrado', theme: 'colored', toastType: 'error' })
    }
  }, [employeeNotFound, employee])



  const renderRows = (employee: any) => (
    <tr
      key={employee?.id}
      className="hover:bg-[#ebebeb97] cursor-pointer"
      onClick={() => {
        UsestoreData('chosenEmployee', employee?.id)
        dispatch({ type: actions.toggleDefaultModalState, payload: true })
      }}
    >
      <Property property={employee?.id} />
      <Property property={employee?.fullName} />
      <Property property={employee?.phone} />
      <Property property={employee?.alternativePhone ? employee?.alternativePhone : '_'} />
      <Property property={employee?.residence} />
      <Property property={employee?.gender === 'MALE' ? 'Masculino' : 'Feminino'} />
      <Property property={UseGettMaritalStatus(employee?.maritalStatus, employee?.gender)} />
      <Property property={employee?.identityCardNumber} />
      <Property property={UseformatDate(employee?.dateOfBirth)} />
      <Property property={UseformatDate(employee?.emissionDate)} />
      <Property property={UseformatDate(employee?.expirationDate)} />
    </tr>
  )

  return (
    <div className="w-full pl-8 py-16 lg:p-11 lg:rounded-[16px] bg-white flex flex-col gap-8">
      {lookingForTheEmployee && <ProgressBar />}

      <h1 className={`text-[24px] lg:text-[32px] font-semibold leading-9 ${state.signupFormStatus ? 'hidden' : 'flex'}`}>
        Total de funcionários ( {employees?.employees?.totalItems || 0} )
      </h1>

      <div className="flex items-center justify-between flex-wrap gap-5 w-full pr-4">
        <button
          type="button"
          onClick={() => dispatch({ type: actions.displaySignupModal, payload: !state.signupFormStatus })}
          className="bg-[#000] text-[14px] sm:text-[16px] text-white font-semibold py-3 px-6 rounded-[32px] uppercase hover:brightness-50 duration-150 "
        >
          {state.signupFormStatus ? <ArrowLeft size={16} weight="bold" color="#fff" /> : 'Criar funcionário'}
        </button>

        {!state.signupFormStatus && (
          <div id="search__area" className="flex flex-col items-center relative gap-3 w-full lg:max-w-[316px]">
            <InputSearch
              placeholder={'Pesquisar funcionário pelo ID...'}
              className="flex-row-reverse"
              icon={
                <MagnifyingGlass
                  id="search-icon"
                  className="cursor-pointer p-1 hover:bg-slate-200 rounded-full flex items-center justify-center"
                  color="#000000"
                  size={24}
                  onClick={searchEmployee}
                />
              }
              value={employeeId}
              onKeyDown={(e: any) => fetchUser(e)}
              onChange={(e: any) => setEmployeeId(e.currentTarget.value)}
            />
            {employee && (
              <button
                type="button"
                onClick={() => {
                  resetEmployeeFound()
                  setEmployeeId('')
                }}
                className="absolute top-14 text-[14px] text-[#898989] py-2 px-4 rounded-3xl hover:bg-[#d1d1d140]"
              >
                Exibir todos...
              </button>
            )}
          </div>
        )}
      </div>

      <FormToRegisterEmployee visible={state.signupFormStatus} />

      {isLoading ? (
        <h1 className="text=[24px] md:text-[32px] font-semibold justify-center flex items-center">
          Buscando funcionários...
        </h1>
      ) : (
        <div
          className={`flex flex-row pt-3 w-full overflow-x-scroll scroll-transparent ${state.signupFormStatus ? 'hidden' : 'flex'}`}
        >
          <div id="grades" className="lg:w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#000C13] text-left whitespace-nowrap ">
                  {tableHeader.map(({ content, id }) => (
                    <HeadLine key={id} colSpan={1} content={content} visible />
                  ))}
                </tr>
              </thead>

              <tbody>
                {!employee || !employee.employee
                  ? (employees?.employees?.items || []).map(renderRows)
                  : renderRows(employee.employee)}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <DefaultModal
        display={state.defaultModalState}
        closeModal={() => dispatch({ type: actions.toggleDefaultModalState, payload: false })}
      >
        <div className="flex flex-col w-full items-start">
          <Link
            to="/admin/painel/editar-funcionario"
            className="bg-transparent flex gap-2 items-center hover:bg-[#9d9d9d56] rounded-md px-4 py-2 w-full"
            onClick={() => dispatch({ type: actions.toggleDefaultModalState, payload: false })}
          >
            <Pen size={18} color="#2d2d2d" />
            Editar funcionário
          </Link>
          <button
            type="button"
            className="bg-transparent flex gap-2 items-center px-4 py-2 w-full hover:bg-[#9d9d9d56] rounded-md"
            onClick={() => alert('Eliminar')}
          >
            <Trash size={18} color="#2d2d2d" />
            Eliminar funcionário
          </button>
        </div>
      </DefaultModal>

      {!state.signupFormStatus && (
        <div className="flex gap-2 flex-wrap w-full">
          {Array.from({ length: employees?.employees?.totalPages }, (_, index: number) => (
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
    </div>
  )
}

export { EmployeesTable }
