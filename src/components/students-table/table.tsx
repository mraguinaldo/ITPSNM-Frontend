'use client'

import { DotsThree } from 'phosphor-react'
import { UseExtractFirstAndLastName } from '../../hooks/useExtractFirstAndLastName'
import { Student } from '../student'
import { STUDENTS, tableHeader } from './data'

const Students = () => {
  return (
    <div id="students" className="py-12 w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E8E8E8]">
            {tableHeader.map(({ id, content }) => (
              <th className="w-auto p-3 text-left text-[14px] lg:text-[16px] font-normal text-[#363636]" key={id}>
                {content}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="w-full">
          {STUDENTS.map(({ id, course, img, level, name, state }) => (
            <Student.Root className="mb-3" key={id} onClick={() => alert(name)}>
              <th className="flex items-center gap-3 py-3 w-[360px]">
                <Student.Image img={img} alt={name} />
                <Student.Name name={UseExtractFirstAndLastName(name) || ''} />
              </th>
              <th className="text-left p-3 w-[172px]">
                <Student.Level level={level} />
              </th>
              <th className="text-left p-3 w-[172px]">
                <Student.Course course={course} />
              </th>
              <th className="text-left p-3 w-[172px]">
                <Student.State locked={state} />
              </th>
              <th className="text-left p-3 w-[68px]">
                <Student.BtnActions icon={<DotsThree color="#161616" size={32} />} onClick={() => alert(name)} />
              </th>
            </Student.Root>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { Students }
