import { Header } from './header'
import { STUDENT } from './data'

const Grades = () => {
  return (
    <section id="grade_report" className="pt-40 lg:px-6 bg-white lg:bg-transparent">
      <div className="w-full max-w-[1296px] m-auto p-6 lg:p-11 lg:rounded-[16px] bg-white">
        <Header />

        <div id="grades" className="py-12 w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F8C40D]">
                {STUDENT.grades.THEAD.map(({ content, id, visible, colSpan }) => (
                  <th
                    key={id}
                    colSpan={colSpan}
                    className={`border-[2px] border-[#D9D9D9] text-[14px] sm:text-[16px] text-center p-2 ${visible ? 'opacity-1' : 'opacity-0'}`}
                  >
                    {content}
                  </th>
                ))}
              </tr>
              <tr>
                {STUDENT.grades.TEST_TYPES.map(({ id, testType, visible }) => (
                  <th
                    key={id}
                    className={`border-[2px] border-[#D9D9D9] text-[14px] sm:text-[16px] text-center p-2 ${visible ? 'opacity-1' : 'opacity-0'}`}
                  >
                    {testType}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STUDENT.grades.TBODY.map(({ id, values }) => (
                <tr key={id}>
                  {values.map(({ id, value, visible }) => (
                    <td
                      key={id}
                      className={`border-[2px] text-[14px] sm:text-[16px] border-[#D9D9D9] w-[60px] text-center p-2
                      ${visible ? 'opacity-1' : 'opacity-0'}
                      ${
                        typeof value === 'number'
                          ? value < 10
                            ? 'text-[#E70F0F]'
                            : 'text-[#3757FF]'
                          : 'text-[#000] text-start pl-4 w-[240px] whitespace-nowrap text-ellipsis overflow-hidden'
                      }`}
                    >
                      {typeof value === 'string'
                        ? value.length > 20
                          ? value.slice(0, -5).concat('...')
                          : value
                        : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export { Grades }
