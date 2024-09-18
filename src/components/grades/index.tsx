import { Header } from './header'
import { STUDENT } from './data'

const Grades = () => {
  const average = 12

  return (
    <section id="grade_report" className="pt-40 lg:px-6 bg-white lg:bg-transparent">
      <div className="w-full max-w-[1296px] flex flex-col gap-9 m-auto p-6 lg:p-11 lg:rounded-[16px] bg-white">
        <Header />

        <div className="flex flex-row pt-12 w-full overflow-x-scroll">
          <div id="grades" className="lg:w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#000C13]">
                  {STUDENT.grades.THEAD.map(({ content, id, visible, colSpan }) => (
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
                  {STUDENT.grades.TEST_TYPES.map(({ id, testType, visible }) => (
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
                {STUDENT.grades.TBODY.map(({ id, notes, subject }) => (
                  <tr key={id}>
                    <td className="text-[#000] text-start pl-4 w-[240px] whitespace-nowrap text-ellipsis overflow-hidden border-[1px] text-[14px] sm:text-[16px] border-[#D9D9D9] p-2">
                      {subject.length > 20 ? subject.slice(0, -5).concat('...') : subject}
                    </td>
                    {notes.map(({ id, note, visible }) => (
                      <td
                        key={id}
                        className={`border-[1px] text-[14px] sm:text-[16px] border-[#D9D9D9] w-[40px] text-center py-2 px-1
                      ${visible ? 'opacity-1' : 'opacity-0'}
                      ${note < 10 ? 'text-[#E70F0F]' : 'text-[#3757FF]'}`}
                      >
                        {note}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="w-full max-w-[124px] px-3 flex bg-[#F2F1F1] justify-center items-center
          "
          >
            <h2
              className={`text-[14px] md:text-[16px] uppercase font-semibold ${average < 10 ? 'text-[#E70F0F]' : 'text-[#3757FF]'}`}
            >
              {average < 10 ? 'Reprovado' : 'Aprovado'}
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Grades }
