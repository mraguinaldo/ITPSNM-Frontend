import { Header } from './header'
import { Table } from './data'
import { useEffect, useState } from 'react'
import { UseGetData } from '../../hooks/useGetData'
import { FAKEUSERS } from '../../utils'

const Grades = () => {
  const average = 12

  const [user, setUser] = useState<any>(null)
  const [currentLevel, setCurrentLevel] = useState<string>('eleventh_class')

  useEffect(() => {
    const fetchData = async () => {
      const loginData: { email: string; password: string } = UseGetData('LoginData')
      const { email, password } = loginData

      const currentUser = FAKEUSERS.find((user) => user.email === email && user.password === password)

      if (currentUser) {
        setUser(currentUser)
      }
    }

    fetchData()
  }, [])

  return (
    <section id="grade_report" className="pt-40 lg:px-6 bg-white lg:bg-transparent">
      {user ? (
        <div className="w-full max-w-[1296px] flex flex-col gap-9 m-auto p-6 lg:p-11 lg:rounded-[16px] bg-white">
          <Header user={user} details={user.details} />
          <div className="flex flex-row pt-12 w-full overflow-x-scroll">
            <div id="grades" className="lg:w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#000C13]">
                    {Table.THEAD.map(({ content, id, visible, colSpan }) => (
                      <th
                        key={id}
                        colSpan={colSpan}
                        className={`border-[1px] text-white border-b-[#D9D9D9] text-[14px] sm:text-[16px] text-center p-2 ${visible ? 'opacity-1' : 'opacity-0'}`}
                      >
                        {content}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    {Table.TEST_TYPES.map(({ id, testType, visible }) => (
                      <th
                        key={id}
                        className={`border-[1px] border-b-[#D9D9D9] text-[14px] sm:text-[16px] text-center p-2 ${visible ? 'opacity-1' : 'opacity-0'}`}
                      >
                        {testType}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {user?.grades[currentLevel].map((item: any) => (
                    <tr key={item.id}>
                      <td className="text-[#000] text-start pl-4 w-[240px] whitespace-nowrap text-ellipsis overflow-hidden border-[1px] text-[14px] sm:text-[16px] border-[#D9D9D9] p-2">
                        {item.subject.length > 20 ? item.subject.slice(0, -5).concat('...') : item.subject}
                      </td>
                      {item.notes.map((currentSubject: any) => (
                        <td
                          key={currentSubject.id}
                          className={`border-[1px] text-[14px] sm:text-[16px] border-[#D9D9D9] w-[40px] text-center py-2 px-1
                          ${currentSubject.visible ? 'opacity-1' : 'opacity-0'}
                          ${currentSubject.note < 10 ? 'text-[#E70F0F]' : 'text-[#3757FF]'}`}
                        >
                          {currentSubject.note}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full max-w-[124px] relative">
              <span className="border-[1px] w-full absolute text-white border-b-[#D9D9D9] bg-[#000C13] text-[14px] sm:text-[16px] text-center font-bold p-2">
                Resultado
              </span>

              <div className="w-full max-w-[124px] px-3 h-full flex bg-[#F2F1F1] justify-center items-center">
                <h2
                  className={`text-[14px] md:text-[16px] uppercase font-semibold ${average < 10 ? 'text-[#E70F0F]' : 'text-[#3757FF]'}`}
                >
                  {average < 10 ? 'Reprovado' : 'Aprovado'}
                </h2>
              </div>
            </div>
          </div>{' '}
        </div>
      ) : (
        <h1 className="text=[24px] md:text-[32px] font-semibold justify-center flex items-center h-dvh">
          Buscando Informações...
        </h1>
      )}
    </section>
  )
}

export { Grades }
