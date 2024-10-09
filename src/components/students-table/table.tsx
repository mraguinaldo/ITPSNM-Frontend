import { Check, DotsThree, X } from 'phosphor-react'
import { Student } from '../student'
import { initialValues, STUDENT_OPTIONS, tableHeader } from './data'
import { ApplicationContexts } from '../contexts/applicationContexts'
import { useContext, useEffect, useReducer } from 'react'
import { StudentOptionsModal } from './modals/student-options'
import { Link, useLocation } from 'react-router-dom'
import { UseRenameClass } from '../../hooks/useRenameClass'
import { UsestoreData } from '../../hooks/useStoreData'
import { QuestionModal } from '../modals/question'
import { UseBlockStudent } from '../../hooks/useBlockStudent'
import { ProgressBar } from '../progress-bar'
import { reducer } from './reducer'
import { actions } from './action'

const Students = ({ students }: { students: any }) => {
  const { studentFound }: any = useContext(ApplicationContexts)
  const [state, dispatch] = useReducer(reducer, initialValues)
  const location = useLocation()

  const {
    mutate: useBlockStudent,
    isLoading: blockingTheStudent,
    isError: errorWhenBlockingStudent,
    isSuccess: blockedStudent,
  } = UseBlockStudent('enrollmentsAproved')

  const closeLockModal = () => {
    dispatch({ type: actions.toggleLockModalState, payload: false })

    dispatch({ type: actions.changeSelectedStudent, payload: '' })
  }

  const handleBlockOptionClick = (email: string, status: boolean) => {
    dispatch({ type: actions.toggleLockModalState, payload: true })
    dispatch({ type: actions.changeSelectedStudent, payload: email })

    dispatch({ type: actions.toggleStudentStatus, payload: status })
  }

  const handleStudentClick = (studentId: string) => {
    dispatch({ type: actions.changeSelectedStudent, payload: state.selectedStudent === studentId ? '' : studentId })
  }

  useEffect(() => {
    if (blockingTheStudent) dispatch({ type: actions.toggleLockModalState, payload: false })
  }, [blockingTheStudent])

  useEffect(() => {
    if (blockedStudent || errorWhenBlockingStudent) {
      dispatch({ type: actions.changeSelectedStudent, payload: '' })
    }
  }, [blockedStudent, errorWhenBlockingStudent])

  const renderStudentRow = (student: any) =>
    student.students?.User && (
      <Student.Root className="mb-3" key={student.identityCardNumber}>
        <th className="text-left p-3 w-[172px]">
          <Student.Level level={student.id} />
        </th>
        <th className="flex items-center gap-3 p-3 w-[360px]">
          {/* <Student.Image img="/default.jpeg" alt={student.fullName} /> */}
          <Student.Name name={student.students.fullName} />
        </th>
        <th className="text-left p-3 w-[172px]">
          <Student.Level level={UseRenameClass(student.levels.name)} />
        </th>
        <th className="text-left p-3 w-[172px]">
          <Student.Course course={student.courses.name} />
        </th>

        <th
          className="text-left p-3 w-[172px]"
          onClick={() => handleBlockOptionClick(student.students.User.email, !student.students.User.isBlocked)}
        >
          <Student.State locked={student.students.User.isBlocked} />
        </th>
        <th className="text-left p-3 w-[68px]">
          <Student.BtnActions
            icon={
              state.selectedStudent === student.identityCardNumber ? (
                <X color="#161616" size={14} />
              ) : (
                <DotsThree color="#161616" size={32} />
              )
            }
            onClick={() => handleStudentClick(student.identityCardNumber)}
          />
        </th>
        <StudentOptionsModal isVisible={state.selectedStudent === student.identityCardNumber}>
          {STUDENT_OPTIONS.map(({ Icon, id, option, href }) =>
            href ? (
              <Link
                to={href}
                key={id}
                onClick={() => {
                  UsestoreData('chosenStudent', student.identityCardNumber)
                  UsestoreData('previousRoute', location.pathname)
                }}
                className="text-[14px] flex gap-2 items-center text-[#1c1c1c]"
              >
                <Icon size={14} color="#000" /> {option}
              </Link>
            ) : (
              <button
                type="button"
                key={id}
                className="bg-transparent text-[14px] flex gap-2 items-center text-[#1c1c1c]"
                onClick={() =>
                  option === 'Bloquear' &&
                  handleBlockOptionClick(student.students.User.email, !student.students.User.isBlocked)
                }
              >
                <Icon size={14} color="#000" />{' '}
                {option === 'Bloquear' && student.students.User.isBlocked ? 'Desbloquear' : option}
              </button>
            ),
          )}
        </StudentOptionsModal>
      </Student.Root>
    )

  return (
    <div id="students" className="py-12 w-full overflow-x-auto overflow-y-auto scroll-transparent pb-10">
      {blockingTheStudent && <ProgressBar />}
      <QuestionModal
        title={state.studentStatus ? 'Deseja bloquear o estudante?' : 'Confirmar o desbloqueio do estudante'}
        paragraph={state.studentStatus ? 'O estudante deixará de ter acesso ao sistema.' : ''}
        visible={state.modalStateForBlocking}
        iconReject={<X color="#fff" size={24} />}
        iconConfirm={<Check color="#fff" size={24} />}
        reject={closeLockModal}
        confirm={() => useBlockStudent({ formData: { status: state.studentStatus, email: state.selectedStudent } })}
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
          {studentFound ? renderStudentRow(studentFound?.enrollment) : (students?.items || []).map(renderStudentRow)}
        </tbody>
      </table>
    </div>
  )
}

export { Students }
