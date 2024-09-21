'use client'
import { STUDENTS, tableHeader } from './data'
import { Student } from '../student'
import { DotsThree } from 'phosphor-react'
import { UseExtractFirstAndLastName } from '../../hooks/useExtractFirstAndLastName'
// import { StudentInformationModal } from '../modals/student-information-modal'
// import { useState } from 'react'

const Students = () => {
  // const [stateStudentInformationModal, setStateStudentInformationModal] = useState<boolean>(true)
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
      {/* <StudentInformationModal
        visible={stateStudentInformationModal}
        toggleStateModal={() => setStateStudentInformationModal(false)}
        // biome-ignore lint/correctness/noChildrenProp: <explanation>
        children={
          <div>
            <h1>Nome completo: {STUDENT_DATA.fullName}</h1>
            <p>Telefone: {STUDENT_DATA.phone}</p>
            <p>Telefone alternativo: {STUDENT_DATA.alternativePhone}</p>
            <p>Email: {STUDENT_DATA.email}</p>
            <p>Curso: {STUDENT_DATA.course}</p>
            <p>{STUDENT_DATA.level}</p>
            <p>{STUDENT_DATA.father}</p>
            <p>{STUDENT_DATA.mother}</p>
            <p>{STUDENT_DATA.gender}</p>
            <p>{STUDENT_DATA.height}</p>
            <p>{STUDENT_DATA.identityCardNumber}</p>
            <p>{STUDENT_DATA.residence}</p>
            <p>{STUDENT_DATA.province}</p>
            <p>{STUDENT_DATA.natural}</p>
            <p>{STUDENT_DATA.maritalStatus}</p>
            <p>{STUDENT_DATA.expirationDate}</p>
            <p>{STUDENT_DATA.emissionDate}</p>
          </div>
        }
      /> */}
    </div>
  )
}

export { Students }
