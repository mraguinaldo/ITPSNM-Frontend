import { Check, CircleNotch, DotsThree, X } from 'phosphor-react'
import { Student } from '../student'
import { initialValues, LEVELS, STUDENT_OPTIONS, tableHeader } from './data'
import { ApplicationContexts } from '../contexts/applicationContexts'
import { useContext, useEffect, useReducer, useState } from 'react'
import { StudentOptionsModal } from './modals/student-options'
import { useLocation } from 'react-router-dom'
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
import { ButtonToChangeLevel } from './buttons/button-to-change-level'
import { ConfirmationDetailsViewer } from './confirmation-details-viewer'
import { StudentOptionsButton } from './buttons/student-options-button'
import { StudentOptionsLink } from './buttons/student-options-link'
import { HeaderContent } from './header-content'
import { PERIODS } from '../enrollment-table/data'
import { ButtonToChooseThePeriod } from '../enrollment-table/button-to-choose-the-period'
import { Input } from '../inputs/normal'

const Students = ({ students }: { students: any }) => {
  const { studentFound, setStudentFound }: any = useContext(ApplicationContexts)
  const [showData, setShowData] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, initialValues)
  const location = useLocation()
  const {
    isLoading,
    isSuccess,
    mutate: useConfirmeStudent,
    data
  }: any = UseConfirmStudent()

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
    dispatch({
      type: actions.changeSelectedStudent,
      payload: state.selectedStudent === studentId ? '' : studentId
    })
  }

  const confirmStudent = () => {
    const currentYear = Number(state.academicYear.slice(0, 4))
    const nextYear = Number(state.academicYear.slice(-4))

    if (state?.currentLevelId === 0) {
      Toast({
        message: 'Selecione a classe',
        theme: 'colored',
        toastType: 'error'
      })
    } else if (nextYear - currentYear === 1 && state.academicYear.slice(4, -4) === '-') {
      const formData = {
        enrollmentNumber: state?.enrollmentNumber,
        levelId: state?.currentLevelId,
        period: state?.currentPeriod,
        academicYear: state?.academicYear
      }

      useConfirmeStudent({ formData })
    } else {
      Toast({
        message: 'Formato do ano acadêmico incorrecto. EX: 2024-2025',
        theme: 'colored',
        toastType: 'error'
      })
    }
  }

  const resetStudentInformation = () => {
    dispatch({ type: actions.toggleEnrollmentNumber, payload: 0 })
    dispatch({ type: actions.changeLevelId, payload: 0 })
    setShowData(true)
  }

  const openOptionsModal = (
    option: string,
    email: string,
    isBlocked: boolean,
    studentId: any
  ) => {
    switch (option) {
      case 'Bloquear':
        handleBlockOptionClick(email, isBlocked)
        break
      case 'Confirmar estudante':
        dispatch({
          type: actions.toggleEnrollmentNumber,
          payload: studentId
        }),
          dispatch({
            type: actions.changeModalStateToChangeLevel,
            payload: true
          })
        break
    }
  }

  const togglePeriod = (period: string) => {
    dispatch({
      type: actions.toggleCurrentPeriod,
      payload: period,
    })
  }

  useEffect(() => {
    if (blockingTheStudent) {
      dispatch({
        type: actions.toggleLockModalState,
        payload: false
      })
    }
  }, [blockingTheStudent])


  useEffect(() => { isSuccess && resetStudentInformation() }, [isSuccess])

  useEffect(() => {
    if (blockedStudent || errorWhenBlockingStudent) {
      dispatch({ type: actions.changeSelectedStudent, payload: '' })
    }

    if (studentFound && blockedStudent) {
      setStudentFound(null)
      Toast({
        message: 'Estado alterado...',
        theme: 'colored',
        toastType: 'success'
      })
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
          className={`
            text-left p-3 w-[172px] 
            ${blockingTheStudent ? 'pointer-events-none' : 'pointer-events-auto'}`
          }
          onClick={() =>
            handleBlockOptionClick(
              student.students.User.email,
              !student.students.User.isBlocked
            )}
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
        <StudentOptionsModal
          isVisible={state.selectedStudent === student.identityCardNumber}
        >
          {STUDENT_OPTIONS.map(({ Icon, id, option, href }) =>
            href ? (
              <StudentOptionsLink
                key={id}
                option={option}
                Icon={Icon}
                href={href}
                onClick={() => {
                  UsestoreData('chosenStudent', student.identityCardNumber)
                  UsestoreData('previousRoute', location.pathname)
                }}
              />
            ) : (
              <StudentOptionsButton
                key={id}
                Icon={Icon}
                isBlocked={student?.students?.User?.isBlocked}
                option={option}
                onClick={() =>
                  openOptionsModal(
                    option,
                    student.students.User.email,
                    !student.students.User.isBlocked,
                    student?.id
                  )
                }
              />
            ),
          )}
        </StudentOptionsModal>
      </Student.Root >
    )

  return (
    <div id="students" className="pt-12 w-full overflow-x-auto scroll-transparent pb-16">
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
        }}
      >
        {showData && data?.classes ?
          <ConfirmationDetailsViewer
            classRoom={data?.classes?.classrooms?.name}
            fullName={data?.students?.fullName}
            level={data?.classes?.name}
            period={data?.classes?.period}
          /> :
          <div className={`flex-col gap-4 p-4  ${state?.modalStateToChangeLevel ? 'flex' : 'hidden'}`}>
            <h2 className="text=[18px] md:text-[24px] font-medium">
              Selecione a classe
            </h2>
            <div className="grid gap-4 grid-cols-2">
              {LEVELS.map(({ id, level }) => (
                <ButtonToChangeLevel
                  key={id}
                  id={id}
                  currentLevelId={state?.currentLevelId}
                  level={level}
                  onClick={() => dispatch({ type: actions.changeLevelId, payload: id })}
                />
              ))}
            </div>
            <h2 className="text-[16px] font-medium">
              Selecione o período
            </h2>
            <div className="flex gap-4 sm:flex-nowrap">
              {PERIODS.map(({ id, content, period }) => (
                <ButtonToChooseThePeriod
                  key={id}
                  content={content}
                  onClick={() => togglePeriod(period)}
                  option={state?.currentPeriod === period}
                />))}
            </div>
            <Input
              inputType='text'
              label='Ano Acadêmico'
              onChange={(e) =>
                dispatch({
                  type: actions.addAcademicYear,
                  payload: e.currentTarget.value
                })
              }
            />
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
        title={state.studentStatus ?
          'Deseja bloquear o estudante?' : 'Confirmar o desbloqueio do estudante'
        }
        paragraph={state.studentStatus ?
          'O estudante deixará de ter acesso ao sistema.' : ''
        }
        visible={state.modalStateForBlocking}
        iconReject={<X color="#fff" size={24} />}
        iconConfirm={<Check color="#fff" size={24} />}
        reject={closeLockModal}
        confirm={() =>
          useBlockStudent({
            formData: {
              status: state.studentStatus, email: state.selectedStudent
            }
          })}
      />

      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E8E8E8]">
            {tableHeader.map(({ id, content }) => (
              <HeaderContent content={content} key={id} />
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
