import { Check, CircleNotch, DotsThree, X } from 'phosphor-react'
import { Student } from '../student'
import { initialValues, STUDENT_OPTIONS, tableHeader } from './data'
import { ApplicationContexts } from '../contexts/applicationContexts'
import { useContext, useEffect, useReducer } from 'react'
import { StudentOptionsModal } from './modals/student-options'
import { Link, useLocation } from 'react-router-dom'
import { UseRenameClass } from '../../hooks/useRenameClass'
import { UsestoreData } from '../../hooks/useStoreData'
import { QuestionModal } from '../modals/question'
import { reducer } from './reducer'
import { actions } from './action'
import { UseApproveEnrollment } from '../../hooks/useApproveEnrollment'

interface IStudents {
  students: any
}

const Students = ({ students }: IStudents) => {
  const { enrollmentFound }: any = useContext(ApplicationContexts)
  const [state, dispatch] = useReducer(reducer, initialValues)
  const {
    mutate: useApproveEnrollment,
    isLoading: approvingTheEnrollment,
    isSuccess: approvedEnrollment,
  } = UseApproveEnrollment()
  const location = useLocation()

  const closeLockModal = () => {
    dispatch({ type: actions.changeModalStateToApproveEnrollment, payload: false })

    dispatch({ type: actions.changeSelectedStudent, payload: '' })
  }

  const handleStudentClick = (studentId: string) => {
    dispatch({ type: actions.changeSelectedStudent, payload: state.selectedStudent === studentId ? '' : studentId })
  }

  const approveEnrollment = () => {
    dispatch({
      type: actions.changeModalStateToApproveEnrollment,
      payload: false,
    })
    const formData = {
      courseId: state.courseId,
      levelId: state.levelId,
      docsState: 'APPROVED',
      paymentState: 'APPROVED',
    }

    if (formData) {
      useApproveEnrollment({ formData, enrollmentId: state?.enrollmentId })
    }
  }

  const openModalToApproveEnrollment = (student: any) => {
    dispatch({
      type: actions.changeModalStateToApproveEnrollment,
      payload: true,
    })
    dispatch({
      type: actions.changeLevel,
      payload: student?.levelId,
    })
    dispatch({
      type: actions.changeEnrollmentId,
      payload: student?.id,
    })
    dispatch({
      type: actions.changeCourse,
      payload: student?.courseId,
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (approvedEnrollment) handleStudentClick(state.selectedStudent)
  }, [approvedEnrollment])

  const renderStudentRow = (student: any) => (
    <Student.Root className="mb-3" key={student.identityCardNumber}>
      <th className="text-left p-3 w-[172px]">
        <Student.Level level={student?.id} />
      </th>
      <th className="flex items-left gap-3 p-3 w-[360px]">
        <Student.Name name={student?.students?.fullName} />
      </th>
      <th className="text-left p-3 w-[172px]">
        <Student.Level level={UseRenameClass(student?.levels?.name)} />
      </th>
      <th className="text-left p-3 w-[172px]">
        <Student.Course course={student?.courses?.name} />
      </th>
      <th className="flex justify-center items-center text-center p-3 w-[172px]">
        <Student.Course
          course={`${student?.docsState === 'PENDING' && student?.paymentState === 'PENDING' ? 'Pendente' : 'Aprovada'}`}
          className={`hover:brightness-50 duration-150 flex items-center justify-center rounded-[38px] w-full max-w-[140px] py-2 font-semibold ${student?.docsState === 'PENDING' && student?.paymentState === 'PENDING' ? 'bg-[#d0553d9f]' : 'bg-[#3dd0899f]  '}`}
        />
      </th>
      <th className="text-left p-3 w-[68px]">
        <Student.BtnActions
          icon={
            approvingTheEnrollment ? (
              state.selectedStudent === student?.identityCardNumber ? (
                <CircleNotch size={14} className="animate-rotate" />
              ) : (
                <DotsThree color="#161616" size={32} />
              )
            ) : state.selectedStudent === student?.identityCardNumber ? (
              <X color="#161616" size={14} />
            ) : (
              <DotsThree color="#161616" size={32} />
            )
          }
          onClick={() => handleStudentClick(student?.identityCardNumber)}
        />
      </th>
      <StudentOptionsModal isVisible={state.selectedStudent === student?.identityCardNumber}>
        {STUDENT_OPTIONS.map(({ Icon, id, option, href }) =>
          href ? (
            <Link
              to={href}
              key={id}
              onClick={() => {
                UsestoreData('chosenStudent', student?.identityCardNumber)
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
              onClick={() => {
                option === 'Confirmar matrícula' && openModalToApproveEnrollment(student)
              }}
            >
              <Icon size={14} color="#000" />
              {option}
            </button>
          ),
        )}
      </StudentOptionsModal>
    </Student.Root>
  )

  return (
    <div id="students" className="py-12 w-full overflow-x-auto overflow-y-auto scroll-transparent pb-10">
      <QuestionModal
        title={'Deseja aprovar a matrícula?'}
        paragraph={'Após a aprovação da matrícula, a pessoa associada à matrícula se tornará estudante da instituição.'}
        visible={state.modalStatusToConfirmEnrollment}
        iconReject={<X color="#fff" size={24} />}
        iconConfirm={<Check color="#fff" size={24} />}
        reject={closeLockModal}
        confirm={approveEnrollment}
      />
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E8E8E8]">
            {tableHeader.map(({ id, content }) => (
              <th
                className={`w-auto p-3 whitespace-nowrap text-[14px] lg:text-[16px] font-normal text-[#363636] ${content === 'Estado da matrícula' ? 'text-left' : 'text-left '}`}
                key={id}
              >
                {content}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="w-full">
          {enrollmentFound
            ? renderStudentRow(enrollmentFound?.enrollment)
            : (students?.items || []).map(renderStudentRow)}
        </tbody>
      </table>
    </div>
  )
}

export { Students }
