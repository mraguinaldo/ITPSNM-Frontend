import { useReducer, useState } from 'react'
import { UseGetEmployees } from '../../hooks/useGetEmployees'
import { ProgressBar } from '../progress-bar'
import { actions } from './actions'
import { initialValues, tableHeader } from './data'
import { FormToRegisterEmployee } from './form'
import { HeadLine } from './headline'
import { Property } from './property'
import { reducer } from './reducer'
import { ArrowLeft, MagnifyingGlass } from 'phosphor-react'
import { InputSearch } from '../inputs/search'
import { UseGettMaritalStatus } from '../../hooks/useGetMaritalStatus'
import { UseformatDate } from '../../hooks/useFormatDate'

const EmployeesTable = () => {
  const { data: employees, isLoading }: any = UseGetEmployees()
  const [state, dispatch] = useReducer(reducer, initialValues)
  const [employeesFound, setEmployeesFound] = useState<any>()

  const searchStudent = (currentTarget: string) => {
    const currentStudents = employees.employees.items.filter((item: any) => {
      return item.fullName.toLowerCase().includes(currentTarget.toLowerCase())
    })

    setEmployeesFound(currentStudents)
  }

  if (isLoading) {
    return <ProgressBar />
  }

  return (
    <div className="w-full pl-8 py-16 lg:p-11 lg:rounded-[16px] bg-white flex flex-col gap-8">
      <h1 className={`text-[24px] font-semibold leading-9 ${state.signupFormStatus ? 'hidden' : 'flex'}`}>
        Total de funcionários ({employees.employees.items.length})
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
          <div id="search__area" className="flex flex-col items-center relative w-full lg:max-w-[316px]">
            <InputSearch
              placeholder="Pesquisar alunos..."
              icon={<MagnifyingGlass color="#737373" size={16} />}
              onChange={(e: any) => searchStudent(e.currentTarget.value)}
            />
          </div>
        )}
      </div>

      <FormToRegisterEmployee visible={state.signupFormStatus} />

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
              {(employeesFound ? employeesFound : employees.employees.items || []).map((employee: any) => (
                <tr
                  key={employee.id}
                  className="hover:bg-[#ebebeb97] cursor-pointer"
                  onClick={() => {
                    alert(employee.fullName)
                  }}
                >
                  <Property property={employee.fullName} />
                  <Property property={employee.phone} />
                  <Property property={employee.residence} />
                  <Property property={employee.gender === 'MALE' ? 'Masculino' : 'Feminino'} />
                  <Property property={UseGettMaritalStatus(employee.maritalStatus, employee.gender)} />
                  <Property property={employee.identityCardNumber} />
                  <Property property={UseformatDate(employee.dateOfBirth)} />
                  <Property property={UseformatDate(employee.emissionDate)} />
                  <Property property={UseformatDate(employee.expirationDate)} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export { EmployeesTable }
