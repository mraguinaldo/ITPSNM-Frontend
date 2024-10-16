import { useEffect, useReducer } from 'react'
import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { SelectedArea } from '../../components/selected-area'
import { GENRES, MARITAL_STATUS, fields, initialValues } from './data'
import { RadioButton } from '../../components/radio-button'
import { OptionsModal } from '../../components/modals/options-modal'
import { reducer } from './reducer'
import { actions } from './actions'
import { ProgressBar } from '../../components/progress-bar'
import { Toast } from '../toast'
import { UseEditEmployee } from '../../hooks/useEditEmployee'
import { UseGetData } from '../../hooks/useGetData'
import { UseGetEmployee } from '../../hooks/useGetEmployee'
import { UseGettMaritalStatus } from '../../hooks/useGetMaritalStatus'

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const employeeId = UseGetData('chosenEmployee')
  const { data: employeeFound, mutate: useGetEmployee, isLoading: collectingEmployeeData }: any = UseGetEmployee()
  const { mutate: useEditEmployee, isLoading, isSuccess } = UseEditEmployee()

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
      gender: '',
      alternativePhone: undefined,
      phone: '',
      emissionDate: undefined,
      identityCardNumber: '',
      maritalStatus: '',
      residence: '',
      expirationDate: undefined,
    },
  })

  const toggleModalState = (value: number) => {
    const newValue = state.modalState !== value ? value : 100
    dispatch({ type: actions.toggleModalState, payload: newValue })
    dispatch({ type: actions.changeStateOfChevron, payload: newValue })
  }

  const changeGender = (value: number, gender: string) => {
    dispatch({ type: actions.changeGender, payload: value })
    dispatch({
      type: actions.toggleMaritalStatus,
      payload: UseGettMaritalStatus(getValues('maritalStatus') || '', gender),
    })
  }

  useEffect(() => {
    if (isSuccess) {
      Toast({ message: 'Funcionário Editado', theme: 'colored', toastType: 'success' })
    }
  }, [isSuccess])

  useEffect(() => {
    if (employeeId) {
      useGetEmployee(employeeId)
    }
  }, [employeeId, useGetEmployee])

  useEffect(() => {
    if (employeeFound) {
      for (const field of fields) {
        setValue(field, employeeFound?.employee[field], { shouldValidate: true })
      }

      dispatch({
        type: actions.toggleMaritalStatus,
        payload: UseGettMaritalStatus(employeeFound?.employee.maritalStatus, employeeFound?.employee.gender),
      })

      dispatch({
        type: actions.changeGender,
        payload: employeeFound?.employee.gender === 'MALE' ? 0 : 1,
      })

      setValue('dateOfBirth', employeeFound?.employee.dateOfBirth.split('T')[0], { shouldValidate: true })
      setValue('emissionDate', employeeFound?.employee.emissionDate.split('T')[0], { shouldValidate: true })
      setValue('expirationDate', employeeFound?.employee.expirationDate.split('T')[0], { shouldValidate: true })
    }
  }, [employeeFound, setValue])

  const onSubmit = (data: any) => {
    try {
      useEditEmployee({ formData: data, id: employeeId })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {(isLoading || collectingEmployeeData) && <ProgressBar />}
      <h1 className="text-[24px] font-semibold">{employeeFound?.employee.fullName}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-6 flex-col w-full duration-300 scroll-transparent pr-8 lg:pr-0"
      >
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
          <Input
            label="Data de nascimento"
            errorMessage={errors.dateOfBirth?.message}
            inputType="date"
            placeholder="Data de nascimento"
            {...register('dateOfBirth')}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[16px] font-medium text-[#2F2F2F]">Sexo</p>
          {GENRES.map(({ id, content, gender }) => (
            <RadioButton
              key={id}
              value={state.genderId === id && gender}
              checked={state.genderId === id}
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

        <div className="relative w-full">
          <Input
            label="Estado Civil"
            errorMessage={errors.maritalStatus?.message}
            inputType="text"
            onClick={() => toggleModalState(3)}
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
                area={content.concat(
                  state.genderId !== undefined && GENRES[state.genderId]?.gender === 'MALE' ? 'o' : 'a',
                )}
                onClick={() => {
                  toggleModalState(3)
                  dispatch({
                    type: actions.toggleMaritalStatus,
                    payload: content.concat(
                      state.genderId !== undefined && GENRES[state.genderId]?.gender === 'MALE' ? 'o' : 'a',
                    ),
                  })
                  setValue('maritalStatus', maritalStatus, { shouldValidate: true })
                }}
              />
            ))}
          </OptionsModal>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-5 md:gap-3">
          <Input
            label="Residência"
            errorMessage={errors.residence?.message}
            inputType="text"
            placeholder="Residência"
            {...register('residence')}
          />
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-5 md:gap-3">
          <Input
            label="Data de emissão"
            errorMessage={errors.emissionDate?.message}
            inputType="date"
            placeholder="Data de emissão"
            {...register('emissionDate')}
          />
          <Input
            label="Data de validade"
            errorMessage={errors.expirationDate?.message}
            inputType="date"
            placeholder="Data de validade"
            {...register('expirationDate')}
          />
        </div>
        <div className="pt-3 w-full">
          <Button isLoading={false} type="submit" content="Atualizar" />
        </div>
      </form>
    </>
  )
}

export { Form }
