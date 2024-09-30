import { DotsThree, X } from 'phosphor-react'
import { Student } from '../student'
import { STUDENT_OPTIONS, tableHeader } from './data'
import { ApplicationContexts } from '../contexts/applicationContexts'
import { useContext, useState } from 'react'
import { StudentOptionsModal } from './modals/student-options'
import { ModalForBlocking } from './modals/modal-for-blocking'
import { Link } from 'react-router-dom'
import { UseRenameClass } from '../../hooks/useRenameClass'
import { UsestoreData } from '../../hooks/useStoreData'

const Students = ({ students }: { students: any }) => {
  const [currentStudent, setCurrentStudent] = useState<string>('')
  const { studentsFound }: any = useContext(ApplicationContexts)
  const [modalStateForBlocking, setModalStateForBlocking] = useState<boolean>(false)

  const closeLockModal = () => {
    setModalStateForBlocking(false)
    setCurrentStudent('')
  }

  const handleBlockOptionClick = () => {
    setModalStateForBlocking(true)
  }

  const handleStudentClick = (studentId: string) => {
    setCurrentStudent((prev) => (prev === studentId ? '' : studentId))
  }

  const renderStudentRow = (student: any) => (
    <Student.Root className="mb-3" key={student.identityCardNumber}>
      <th className="flex items-center gap-3 py-3 w-[360px]">
        <Student.Image img="/default.jpeg" alt={student.fullName} />
        <Student.Name name={student.students.fullName} />
      </th>
      <th className="text-left p-3 w-[172px]">
        <Student.Level level={UseRenameClass(student.levels)} />
      </th>
      <th className="text-left p-3 w-[172px]">
        <Student.Course course={student.courses.name} />
      </th>
      <th className="text-left p-3 w-[172px]">
        <Student.State locked={false} />
      </th>
      <th className="text-left p-3 w-[68px]">
        <Student.BtnActions
          icon={
            currentStudent === student.identityCardNumber ? (
              <X color="#161616" size={14} />
            ) : (
              <DotsThree color="#161616" size={32} />
            )
          }
          onClick={() => handleStudentClick(student.identityCardNumber)}
        />
      </th>
      <StudentOptionsModal isVisible={currentStudent === student.identityCardNumber}>
        {STUDENT_OPTIONS.map(({ Icon, id, option, href }) =>
          href ? (
            <Link
              to={href}
              key={id}
              onClick={() => UsestoreData('chosenStudent', student.identityCardNumber)}
              className="text-[14px] flex gap-2 items-center text-[#1c1c1c]"
            >
              <Icon size={14} color="#000" /> {option}
            </Link>
          ) : (
            <span
              key={id}
              className="text-[14px] flex gap-2 items-center text-[#1c1c1c]"
              onClick={() => option === 'Bloquear' && handleBlockOptionClick()}
            >
              <Icon size={14} color="#000" /> {option}
            </span>
          ),
        )}
      </StudentOptionsModal>
    </Student.Root>
  )

  return (
    <div id="students" className="py-12 w-full overflow-x-auto">
      <ModalForBlocking
        identityCardNumber={currentStudent}
        modalStateForBlocking={modalStateForBlocking}
        closeModal={closeLockModal}
        onClick={closeLockModal}
      />

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
          {(studentsFound?.length > 0 ? studentsFound : students?.items || []).map(renderStudentRow)}
        </tbody>
      </table>
    </div>
  )
}

export { Students }
