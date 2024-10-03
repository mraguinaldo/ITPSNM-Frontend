import { UseGetEmployees } from '../../hooks/useGetEmployees'
import { ProgressBar } from '../progress-bar'
import { tableHeader } from './data'
import { HeadLine } from './headline'
import { Property } from './property'

const EmployeesTable = () => {
  const { data: employees, isLoading }: any = UseGetEmployees()

  if (isLoading) {
    return <ProgressBar />
  }

  const getMaritalStatus = (status: string, gender: string) => {
    const maritalStatusMap: any = {
      SINGLE: gender === 'MALE' ? 'Solteiro' : 'Solteira',
      MARRIED: gender === 'MALE' ? 'Casado' : 'Casada',
      DIVORCED: gender === 'MALE' ? 'Divorciado' : 'Divorciada',
      WIDOWED: gender === 'MALE' ? 'Viúvo' : 'Viúva',
    }
    return maritalStatusMap[status] || ''
  }

  return (
    <div className="w-full pl-8 py-16 lg:p-11 lg:rounded-[16px] bg-white h-dvh">
      <h1 className="text-[24px] lg:text-[32px] font-semibold leading-9">Tabela de funcionários</h1>

      <div className="flex flex-row pt-12 w-full overflow-x-scroll scroll-transparent">
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
              {employees?.employees.items.map((employee: any) => (
                <tr key={employee.id}>
                  <Property property={employee.fullName} />
                  <Property property={employee.phone} />
                  <Property property={employee.residence} />
                  <Property property={employee.gender === 'MALE' ? 'Masculino' : 'Feminino'} />
                  <Property property={getMaritalStatus(employee.maritalStatus, employee.gender)} />
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
