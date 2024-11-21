import { Check, CircleNotch, DotsThree, X } from 'phosphor-react'
import { Student } from '../student'
import { initialValues, LEVELS, STUDENT_OPTIONS, tableHeader } from './data'
import { ApplicationContexts } from '../contexts/applicationContexts'
import { useContext, useEffect, useReducer, useState } from 'react'
import { StudentOptionsModal } from './modals/student-options'
import { Link, useLocation } from 'react-router-dom'
import { UseRenameClass } from '../../hooks/useRenameClass'
import { UsestoreData } from '../../hooks/useStoreData'
import { QuestionModal } from '../modals/question'
import { UseBlockUser } from '../../hooks/useBlockUser'
import { ProgressBar } from '../progress-bar'
import { reducer } from './reducer'
import { actions } from './action'
import { Toast } from '../toast'
import { Button } from '../button'
import { DefaultModal } from '../modals/default'
import { UseConfirmStudent } from '../../hooks/useConfirmStudent'

const Students = ({ students }: { students: any }) => {
  const { studentFound, setStudentFound }: any = useContext(ApplicationContexts)
  const { isLoading, isSuccess, mutate: useConfirmeStudent, data }: any = UseConfirmStudent()
  const [showData, setShowData] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, initialValues)
  const location = useLocation()

  const {
    mutate: useBlockStudent,
    isLoading: blockingTheStudent,
    isError: errorWhenBlockingStudent,
    isSuccess: blockedStudent,
  } = UseBlockUser('enrollmentsAproved')

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

  const confirmStudent = () => {
    if (state?.currentLevelId === 0) {
      Toast({
        message: 'Selecione a classe',
        theme: 'colored',
        toastType: 'error'
      })
    } else {
      const formData = {
        enrollmentNumber: state?.enrollmentNumber,
        levelId: state?.currentLevelId
      }

      useConfirmeStudent({ formData })
    }
  }

  const resetStudentInformation = () => {
    dispatch({ type: actions.toggleEnrollmentNumber, payload: 0 })
    dispatch({ type: actions.changeLevelId, payload: 0 })
    setShowData(true)
  }

  useEffect(() => {
    if (blockingTheStudent) dispatch({ type: actions.toggleLockModalState, payload: false })
  }, [blockingTheStudent])


  useEffect(() => {
    if (isSuccess) {
      resetStudentInformation()
    }
  }, [isSuccess])

  useEffect(() => {
    if (blockedStudent || errorWhenBlockingStudent) {
      dispatch({ type: actions.changeSelectedStudent, payload: '' })
    }

    if (studentFound && blockedStudent) {
      setStudentFound(null)
      Toast({ message: 'Estado alterado...', theme: 'colored', toastType: 'success' })
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
          className={`text-left p-3 w-[172px] ${blockingTheStudent ? 'pointer-events-none' : 'pointer-events-auto'}`}
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
                onClick={() => {
                  option === 'Bloquear' &&
                    handleBlockOptionClick(student.students.User.email, !student.students.User.isBlocked)
                  option === 'Confirmar estudante' &&
                    dispatch({ type: actions.toggleEnrollmentNumber, payload: student?.id })
                  dispatch({ type: actions.changeModalStateToChangeLevel, payload: true })
                }
                }
              >
                <Icon size={14} color="#000" />{' '}
                {option === 'Bloquear' && student.students.User.isBlocked ? 'Desbloquear' : option}
              </button>
            ),
          )}
        </StudentOptionsModal>
      </Student.Root >
    )

  return (
    <div id="students" className="pt-12 w-full overflow-x-auto scroll-transparent pb-32">
      {blockingTheStudent && <ProgressBar />}
      <DefaultModal
        display={state?.modalStateToChangeLevel}
        closeModal={() => {
          dispatch({
            type: actions.changeModalStateToChangeLevel,
            payload: false,
          })
          resetStudentInformation()
          setShowData(false)
        }
        }
      >{showData && data?.classes ?
        <div className='flex gap-4 flex-col p-4'>
          <p className='font-medium'>Estudante: {data?.students?.fullName}</p>
          <div className='flex gap-4 flex-wrap'>
            <span className='border-b'>Turma: {data?.classes?.name}</span>
            <span className='border-b'>{data?.classes?.classrooms?.name}</span>
            <span className='border-b'>Periodo: {data?.classes?.period === 'AFTERNOON' ? 'Tarde' : data?.classes?.period === 'MORNING' ? 'Manhã' : 'Noite'}</span>
          </div>
        </div> :
        <div className='flex flex-col gap-4 p-4'>
          <h2 className="text=[18px] md:text-[24px] font-medium">
            Selecione a classe
          </h2>
          <div className="grid gap-4 grid-cols-2">
            {LEVELS.map(({ id, level }) => (
              <button
                key={id}
                type="button"
                className={`text-[14px] uppercase border py-6 px-4 w-full rounded-md  border-[#dcdcdc] ${state?.currentLevelId === id ? 'bg-[#bee7d4] hover:bg-[#bee7d4]' : 'border-[#dcdcdc00] hover:bg-[#dcdcdc52]'}`}
                onClick={() => dispatch({
                  type: actions.changeLevelId, payload: id
                })}
              >
                {level}
              </button>
            ))}
          </div>
          <Button
            type='button'
            onClick={confirmStudent}
            isLoading={isLoading}
            content={isLoading ? '' : 'Confirmar estudante'}
            Icon={isLoading && <CircleNotch size={18} className="animate-rotate" />}
          />
        </div>}
      </DefaultModal>
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
