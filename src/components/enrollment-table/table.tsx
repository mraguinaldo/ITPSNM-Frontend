import { Check, CircleNotch, DotsThree, X } from 'phosphor-react'
import { Student } from '../student'
import { initialValues, PERIODS, STUDENT_OPTIONS, tableHeader } from './data'
import { ApplicationContexts } from '../contexts/applicationContexts'
import { useContext, useEffect, useReducer } from 'react'
import { StudentOptionsModal } from './modals/student-options'
import { useLocation, useNavigate } from 'react-router-dom'
import { UseRenameClass } from '../../hooks/useRenameClass'
import { UsestoreData } from '../../hooks/useStoreData'
import { QuestionModal } from '../modals/question'
import { reducer } from './reducer'
import { actions } from './action'
import { UseApproveEnrollment } from '../../hooks/useApproveEnrollment'
import Cookies from 'js-cookie'
import { DefaultModal } from '../modals/default'
import { Button } from '../button'
import { Toast } from '../toast'
import { ButtonToChooseThePeriod } from './button-to-choose-the-period'
import { HeaderContent } from './header-content'
import { StudentOptionsButton } from './student-options-button'
import { Input } from '../inputs/normal'

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
  const navigate = useNavigate()

  const employeeNumber: any = Cookies.get('employeeNumber')

  const closeLockModal = () => {
    dispatch({
      type: actions.changeModalStateToApproveEnrollment,
      payload: false
    })

    dispatch({ type: actions.changeSelectedStudent, payload: '' })
  }

  const handleStudentClick = (studentId: string) => {
    dispatch({
      type: actions.changeSelectedStudent,
      payload: state.selectedStudent === studentId ? '' : studentId
    })
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
      employeeId: Number(employeeNumber),
      identityCardNumber: state?.identityCardNumber,
      period: state?.currentPeriod,
      paymentId: state?.currentPaymentId
    }

    if (formData) {
      useApproveEnrollment({ formData, enrollmentId: state?.enrollmentId })
      dispatch({
        type: actions.toggleCurrentPeriod,
        payload: '',
      })
    }
  }

  const updatePeriodModalStatus = (status: boolean) => {
    dispatch({
      type: actions.changeModalStatePeriod,
      payload: status,
    })
  }

  const openModalToApproveEnrollment = (student: any) => {
    updatePeriodModalStatus(true)
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
    dispatch({
      type: actions.changeIdentityCardNumber,
      payload: student?.identityCardNumber,
    })
  }

  const openModalToConfirmRegistration = () => {
    if (state?.currentPeriod === '' || !state?.currentPaymentId) {
      Toast({
        message: `
          ${state?.currentPeriod === '' ?
            `Selecione o período ${!state?.currentPaymentId ? 'e' : ''}` : ''
          }
          ${!state?.currentPaymentId ? 'Insira o id do pagamento' : ''}
        `,
        theme: 'colored',
        toastType: 'error'
      })
    } else {
      dispatch({
        type: actions.changeModalStateToApproveEnrollment,
        payload: true,
      })
      updatePeriodModalStatus(false)
    }
  }

  const togglePeriod = (period: string) => {
    dispatch({
      type: actions.toggleCurrentPeriod,
      payload: period,
    })
  }


  const openOptionsModal = (
    href: any,
    option: string,
    identityCardNumber: any,
    student: any) => {

    if (href) {
      UsestoreData('chosenStudent', identityCardNumber)
      UsestoreData('previousRoute', location.pathname)
      navigate(href)
    } else if (option === 'Confirmar matrícula') {
      openModalToApproveEnrollment(student)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (approvedEnrollment) {
      handleStudentClick(state.selectedStudent),
        togglePeriod('')
    }
  }, [approvedEnrollment])

  const renderStudentRow = (student: any) => (
    student?.students && <Student.Root className="mb-3" key={student.identityCardNumber}>
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
      <StudentOptionsModal
        isVisible={state.selectedStudent === student?.identityCardNumber}
      >
        {STUDENT_OPTIONS.map(({ Icon, id, option, href }) =>
          <StudentOptionsButton
            key={id}
            option={option}
            Icon={Icon}
            isVisible={
              option === 'Confirmar matrícula' && student?.docsState !== 'PENDING'
            }
            onClick={() =>
              openOptionsModal(
                href,
                option,
                student?.identityCardNumber,
                student
              )}
          />
        )}
      </StudentOptionsModal>
    </Student.Root>
  )

  return (
    <div id="students" className="pt-12 w-full overflow-x-auto overflow-y-auto scroll-transparent pb-20">
      <DefaultModal
        display={state?.modalStatusToConfirmPeriod}
        closeModal={() => {
          updatePeriodModalStatus(false)
          togglePeriod('')
        }}
      >
        <div className={`flex flex-col gap-4 p-4 ${state?.modalStatusToConfirmPeriod ? 'flex' : 'hidden'}`}>
          <div className="flex gap-2 flex-col w-full">
            <Input
              inputType='number'
              label='Id do pagamento'
              placeholder="Insira o id do pagamento"
              onChange={(e) =>
                dispatch({
                  type: actions.addPaymentId,
                  payload: Number(e.currentTarget.value),
                })
              }
            />
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
          <Button
            type='button'
            isLoading={false}
            content='Confirmar matrícula'
            onClick={openModalToConfirmRegistration}
          />
        </div>

      </DefaultModal>
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
              <HeaderContent
                key={id}
                content={content}
              />
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
