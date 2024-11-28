import { useEffect, useReducer, useState } from 'react'
import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { SelectedArea } from '../../components/selected-area'
import { GENRES, initialValues, MARITAL_STATUS } from './data'
import { RadioButton } from '../../components/radio-button'
import { OptionsModal } from '../../components/modals/options-modal'

// import { UseSendStudentPersonalData } from '../../hooks/useSendStudentPersonalData'
import { ProgressBar } from '../../components/progress-bar'

import { UsestoreData } from '../../hooks/useStoreData'
import { UseFetchCourses } from '../../hooks/useFetchCourses'
import { LEVELS } from '../enrollment-form/data'
import { ArrowLeft, Article, Check, CircleNotch, IdentificationCard, User } from 'phosphor-react'
import { UseHandleFileChange } from '../../hooks/useHandleFileChange'
import type { FileField } from '../document-form/interfaces'
import { ImagePreview } from '../Image-preview'
import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import { UseGetData } from '../../hooks/useGetData'
import { Link, useSearchParams } from 'react-router-dom'
import { UseGettMaritalStatus } from '../../hooks/useGetMaritalStatus'
import { reducer } from './reducer'
import { actions } from './actions'
import { UseApproveEnrollment } from '../../hooks/useApproveEnrollment'
import Cookies from 'js-cookie'
import { PERIODS } from '../enrollment-table/data'
import { ButtonToChooseThePeriod } from '../enrollment-table/button-to-choose-the-period'
import { DefaultModal } from '../modals/default'
import { Toast } from '../toast'
import { UseTranslatePeriods } from '../../hooks/use-translate-periods'

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const [studentImage, setStudantImage] = useState<string>()
  const identityCardNumber = UseGetData('chosenStudent')
  const previousRoute = UseGetData('previousRoute')
  const [, setSearchParams] = useSearchParams()
  const employeeNumber: any = Cookies.get('employeeNumber')

  const { data: courses } = UseFetchCourses()
  const {
    data: enrollmentFound,
    mutate: useCheckEnrollment,
    isLoading: searchingEnrollment
  }: any = UseCheckEnrollment()
  const {
    mutate: useApproveEnrollment,
    isLoading: approvingTheEnrollment,
    isSuccess: approvedEnrollment,
  } = UseApproveEnrollment()

  const togglePeriod = (period: string) => {
    dispatch({
      type: actions.toggleCurrentPeriod,
      payload: period,
    })
  }

  console.log(enrollmentFound?.enrollment.classes)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      fullName: '',
      dateOfBirth: undefined,
      father: '',
      gender: '',
      alternativePhone: undefined,
      phone: '',
      height: undefined,
      emissionDate: undefined,
      identityCardNumber: '',
      maritalStatus: '',
      mother: '',
      residence: '',
      levelId: undefined,
      courseId: undefined,
      REPORT_CARD: undefined,
      IDENTITY_CARD: undefined,
      PHOTO: undefined,
    },
  })

  const toggleModalState = (value: number) => {
    dispatch({
      type: actions.toggleModalState,
      payload: state.modalState !== value ? value : 100
    })
    dispatch({
      type: actions.changeStateOfChevron,
      payload: state.modalState !== value ? value : 100
    })
  }

  const changeGender = (value: number, gender: string) => {
    dispatch({ type: actions.changeGender, payload: value })
    dispatch({
      type: actions.toggleMaritalStatus,
      payload: UseGettMaritalStatus(getValues('maritalStatus') || '', gender),
    })
  }

  const changeStudentPhoto = () => {
    const fileInput = document.getElementById('Foto') as HTMLInputElement
    if (fileInput) fileInput.click()
  }

  const handleFileChange = async (field: FileField, actionType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = UseHandleFileChange(e)
    if (file) {
      setValue(field, file, { shouldValidate: true })
      dispatch({ type: actionType, payload: file.name })
      if (field === 'PHOTO') setStudantImage(URL.createObjectURL(file))
    }
  }

  const onSubmit = (data: any) => {
    try {
      // sendStudentPersonalData({ formData: data })
      UsestoreData('IdentityCard', data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (identityCardNumber) {
      const params = new URLSearchParams({
        identityCardNumber: identityCardNumber,
      })
      setSearchParams(params)
      useCheckEnrollment(params)
    }
  }, [useCheckEnrollment, identityCardNumber, setSearchParams])

  useEffect(() => {
    if (enrollmentFound) {
      const studentFields: any = [
        { name: 'fullName', value: enrollmentFound?.enrollment?.students?.fullName },
        { name: 'father', value: enrollmentFound?.enrollment?.students?.father },
        { name: 'mother', value: enrollmentFound?.enrollment?.students?.mother },
        { name: 'phone', value: enrollmentFound?.enrollment?.students?.phone },
        { name: 'alternativePhone', value: enrollmentFound?.enrollment?.students?.alternativePhone },
        { name: 'gender', value: enrollmentFound?.enrollment?.students?.gender },
        {
          name: 'maritalStatus',
          value: enrollmentFound?.enrollment?.students?.maritalStatus,
        },
        { name: 'residence', value: enrollmentFound?.enrollment?.students?.residence },
        { name: 'height', value: enrollmentFound?.enrollment?.students?.height },
        { name: 'dateOfBirth', value: enrollmentFound?.enrollment?.students?.dateOfBirth.split('T')[0] },
        { name: 'emissionDate', value: enrollmentFound?.enrollment?.students?.emissionDate.split('T')[0] },
      ]

      for (const field of studentFields) {
        setValue(field.name, field.value, { shouldValidate: true })
      }

      const enrollmentFields: any = [
        { name: 'identityCardNumber', value: enrollmentFound?.enrollment?.identityCardNumber },
        { name: 'levelId', value: enrollmentFound?.enrollment?.levelId },
        { name: 'courseId', value: enrollmentFound?.enrollment?.courseId },
      ]

      for (const field of enrollmentFields) {
        setValue(field.name, field.value, { shouldValidate: true })
      }

      dispatch({ type: actions.toggleLevel, payload: enrollmentFound?.enrollment?.levelId })
      dispatch({ type: actions.addCourse, payload: enrollmentFound?.enrollment?.courses?.name })
      dispatch({
        type: actions.changeGender,
        payload: enrollmentFound?.enrollment?.students?.gender === 'MALE' ? 0 : 1,
      })
      dispatch({
        type: actions.toggleMaritalStatus,
        payload: UseGettMaritalStatus(
          enrollmentFound?.enrollment?.students?.maritalStatus,
          enrollmentFound?.enrollment?.students?.gender,
        ),
      })
    }
  }, [enrollmentFound, setValue])

  const approveEnrollment = (enrollmentId: any) => {
    const formData = {
      courseId: enrollmentFound?.enrollment?.courses.id
        ? enrollmentFound?.enrollment?.courses.id
        : enrollmentFound?.enrollment?.courseId,
      levelId: enrollmentFound?.enrollment?.levelId,
      docsState: 'APPROVED',
      paymentState: 'APPROVED',
      employeeId: Number(employeeNumber),
      identityCardNumber: enrollmentFound?.enrollment?.identityCardNumber,
      period: state?.currentPeriod,
      paymentId: state?.currentPaymentId
    }

    if (formData) {
      useApproveEnrollment({ formData, enrollmentId })
    }
  }

  const openModalToConfirmEnrollment = () => {
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
      approveEnrollment(enrollmentFound?.enrollment?.id)
      dispatch({
        type: actions.changeModalStatePeriod,
        payload: false,
      })
    }
  }

  const shouldShowApproveButton =
    enrollmentFound?.enrollment?.docsState !== 'APPROVED' || enrollmentFound?.enrollment?.paymentState !== 'APPROVED'

  return (
    <>
      {(searchingEnrollment) && <ProgressBar />}
      <div className="flex gap-4 items-center">
        <Link to={previousRoute} className="hover:bg-slate-300 rounded-full p-2 w-fit">
          <ArrowLeft size={18} />
        </Link>
        {shouldShowApproveButton && (
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: actions.changeModalStatePeriod,
                payload: true,
              })}
            className="flex items-center duration-150 justify-center py-3 px-5 rounded-3xl cursor-pointer bg-green-300 font-semibold hover:bg-green-400"
          >
            {approvingTheEnrollment ? (
              <CircleNotch size={14} className="animate-rotate" />
            ) : approvedEnrollment ? (
              <Check size={14} weight="bold" />
            ) : (
              'Aprovar matrícula'
            )}
          </button>
        )}
      </div >

      <DefaultModal
        display={state?.modalStatusToConfirmPeriod}
        closeModal={() =>
          dispatch({
            type: actions.changeModalStatePeriod,
            payload: false,
          })}
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
            onClick={openModalToConfirmEnrollment}
          />
        </div>

      </DefaultModal>

      <div className='w-full flex flex-col gap-2'>
        <div className="flex flex-wrap gap-4 justify-between w-full">
          <h2 className="text-[20px] sm:text-[24px] font-semibold">
            Nome do aluno: <span className="font-normal">{enrollmentFound?.enrollment.students.fullName}</span>
          </h2>
          <button
            type="button"
            onClick={() => dispatch({ type: actions.handleStudentEditing, payload: !state.editStudent })}
            className={`py-3 px-5 rounded-3xl cursor-pointer ${state.editStudent ? 'bg-slate-400 text-white' : 'bg-green-300'}`}
          >
            {state.editStudent ? 'Desabilitar edição de aluno' : 'Editar aluno'}
          </button>
        </div>
        <div className='flex flex-wrap gap-2'>
          <span className="text-[18px] font-normal border-b">
            {enrollmentFound?.enrollment?.classes?.classrooms?.name}
          </span>
          <span className="text-[18px] font-normal border-b">
            Turma: {enrollmentFound?.enrollment?.classes?.name}
          </span>
          <span className="text-[18px] font-normal border-b">
            Periodo: {UseTranslatePeriods(enrollmentFound?.enrollment?.classes?.period)}
          </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex gap-6 flex-col w-full ${state.editStudent ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <h2 className="font-semibold text-[24px]">Dados Pessoais</h2>
        <div className="flex gap-3 flex-col w-full max-w-[280px]">
          <label htmlFor="Foto" className="cursor-pointer ">
            Foto
          </label>
          <ImagePreview Icon={User} onClick={changeStudentPhoto} studentImage={studentImage} />
          <Input
            errorMessage={errors.PHOTO?.message}
            inputType="file"
            Icon={User}
            fileName={state.PHOTO}
            placeholder={state.PHOTO}
            className="hidden"
            hiddenLabel
            label="Foto"
            {...register('PHOTO')}
            onChange={(e) => handleFileChange('PHOTO', actions.handleChangeImage, e)}
          />
        </div>
        <Input
          label="Nome completo"
          errorMessage={errors.fullName?.message}
          inputType="text"
          placeholder="Nome completo"
          {...register('fullName')}
        />
        <div className="flex flex-col sm:flex-row w-full gap-5 md:gap-3">
          <Input
            label="Nº do bilhete de identidade"
            errorMessage={errors.identityCardNumber?.message}
            inputType="text"
            placeholder="Bilhete de identidade"
            {...register('identityCardNumber')}
          />
          <div className="relative w-full">
            <Input
              label="Estado Civil"
              errorMessage={errors.maritalStatus?.message}
              inputType="text"
              onClick={() => {
                toggleModalState(3)
              }}
              chevronState={state.chevronState === 3}
              placeholder={'Selecionar estado civil'}
              value={state.maritalStatus}
              option
              {...register('maritalStatus')}
            />
            <OptionsModal modalState={state.modalState === 3}>
              {MARITAL_STATUS.map(({ id, content, maritalStatus }) => (
                <SelectedArea
                  key={id}
                  area={content.concat(GENRES[state.gender].gender === 'MALE' ? 'o' : 'a')}
                  onClick={() => {
                    toggleModalState(3)
                    dispatch({
                      type: actions.toggleMaritalStatus,
                      payload: content.concat(GENRES[state.gender].gender === 'MALE' ? 'o' : 'a'),
                    })
                    setValue('maritalStatus', maritalStatus, { shouldValidate: true })
                  }}
                />
              ))}
            </OptionsModal>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-5 md:gap-3">
          <Input
            label="Pai"
            errorMessage={errors.father?.message}
            inputType="text"
            placeholder="Nome do pai"
            {...register('father')}
          />
          <Input
            label="Mãe"
            errorMessage={errors.mother?.message}
            inputType="text"
            placeholder="Nome da mãe"
            {...register('mother')}
          />
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-5 md:gap-3">
          <Input
            label="Data de nascimento"
            errorMessage={errors.dateOfBirth?.message}
            inputType="date"
            placeholder="Nome completo"
            {...register('dateOfBirth')}
          />
          <Input
            label="Altura"
            errorMessage={errors.height?.message}
            inputType="text"
            placeholder="Altura"
            {...register('height')}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[16px] font-medium text-[#2F2F2F]">Sexo</p>
          {GENRES.map(({ id, content, gender }) => (
            <RadioButton
              key={id}
              value={gender}
              checked={state.gender === id}
              onClick={() => changeGender(id, gender)}
              label={content}
              {...register('gender')}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-5 md:gap-3">
          <Input
            label="Telefone"
            errorMessage={errors.phone?.message}
            inputType="number"
            placeholder="Número de telefone"
            {...register('phone')}
          />
          <Input
            label="Telefone alternativo"
            errorMessage={errors.alternativePhone?.message}
            inputType="number"
            placeholder="Telefone alternativo"
            {...register('alternativePhone')}
          />
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-5 md:gap-3">
          <Input
            label="Residência"
            errorMessage={errors.residence?.message}
            inputType="text"
            placeholder="Residência"
            {...register('residence')}
          />
          <Input
            label="Data de emissão"
            errorMessage={errors.emissionDate?.message}
            inputType="date"
            placeholder="Data de emissão"
            {...register('emissionDate')}
          />
        </div>

        <h2 className="font-semibold text-[24px]">Dados da matrícula</h2>
        <div className="flex w-full gap-3">
          <div className="relative w-full">
            <Input
              label="Curso"
              errorMessage={errors.courseId?.message}
              inputType="text"
              onClick={() => {
                toggleModalState(4)
              }}
              chevronState={state.chevronState === 4}
              placeholder={'Curso'}
              value={state.course}
              option
              {...register('courseId')}
            />
            <OptionsModal modalState={state.modalState === 4}>
              {typeof courses === 'object' &&
                courses?.map((course: any) => (
                  <SelectedArea
                    key={course.id}
                    area={course.name}
                    onClick={() => {
                      toggleModalState(4)
                      dispatch({ type: actions.addCourse, payload: course.name })
                      setValue('courseId', course.id, { shouldValidate: true })
                    }}
                  />
                ))}
            </OptionsModal>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[16px] font-medium text-[#2F2F2F]">Classe</p>
          {LEVELS.map(({ id, level }) => (
            <RadioButton
              key={id}
              value={id}
              checked={state.level === id}
              onClick={() => dispatch({ type: actions.toggleLevel, payload: id })}
              label={level}
              {...register('levelId')}
            />
          ))}
        </div>
        <h2 className="font-semibold text-[24px]">Documentos do aluno</h2>
        <Input
          errorMessage={errors.REPORT_CARD?.message}
          inputType="file"
          Icon={Article}
          fileName={state.REPORT_CARD}
          placeholder={state.REPORT_CARD}
          label="Declaração ou certificado"
          {...register('REPORT_CARD')}
          onChange={(e) => handleFileChange('REPORT_CARD', actions.handleChangeCertificate, e)}
        />

        <Input
          errorMessage={errors.IDENTITY_CARD?.message}
          inputType="file"
          Icon={IdentificationCard}
          fileName={state.IDENTITY_CARD}
          placeholder={state.IDENTITY_CARD}
          label="Bilhete de identidade"
          {...register('IDENTITY_CARD')}
          onChange={(e) => handleFileChange('IDENTITY_CARD', actions.handleChangeIdentityCard, e)}
        />
        <div className="pt-3 w-full">
          <Button isLoading={searchingEnrollment} type="submit" content="Próximo" />
        </div>
      </form>
    </>
  )
}

export { Form }
