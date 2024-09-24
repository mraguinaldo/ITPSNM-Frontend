import { useReducer } from 'react'
import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { SelectedArea } from '../../components/selected-area'
import { GENRES, MARITAL_STATUS, initialValues } from './data'
import { RadioButton } from '../../components/radio-button'
import { OptionsModal } from '../../components/modals/options-modal'
import { reducer } from './reducer'
import { actions } from './actions'

import { UseSendStudentPersonalData } from '../../hooks/useSendStudentPersonalData'
import { ProgressBar } from '../../components/progress-bar'
import { UseFetchProvinces } from '../../hooks/useFetchProvinces'
import { UseFetchCounties } from '../../hooks/useFetchCounties'

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const { data: provinces } = UseFetchProvinces()
  const { data: counties } = UseFetchCounties()
  const { mutate: sendStudentPersonalData, isLoading } = UseSendStudentPersonalData()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      fullName: '',
      countyId: undefined,
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
      natural: '',
      provinceId: undefined,
      residence: '',
      expirationDate: undefined,
    },
  })

  const toggleModalState = (value: number) => {
    dispatch({ type: actions.toggleModalState, payload: state.modalState !== value ? value : 100 })
    dispatch({ type: actions.changeStateOfChevron, payload: state.modalState !== value ? value : 100 })
  }

  const changeGender = (value: number) => {
    dispatch({ type: actions.changeGender, payload: value })
  }

  const onSubmit = (data: any) => {
    try {
      sendStudentPersonalData({ formData: data })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isLoading && <ProgressBar />}
      <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full'}>
        <Input
          label="Nº do bilhete de identidade"
          errorMessage={errors.identityCardNumber?.message}
          inputType="text"
          placeholder="Bilhete de identidade"
          {...register('identityCardNumber')}
        />
        <Input
          label="Nome completo"
          errorMessage={errors.fullName?.message}
          inputType="text"
          placeholder="Nome completo"
          {...register('fullName')}
        />
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
              onClick={() => changeGender(id)}
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
          <div className="relative w-full">
            <Input
              label="Província"
              errorMessage={errors.provinceId?.message}
              inputType="text"
              value={state.province}
              onClick={() => {
                toggleModalState(0)
              }}
              chevronState={state.chevronState === 0}
              placeholder={'Província'}
              option
              {...register('provinceId')}
            />
            <OptionsModal modalState={state.modalState === 0}>
              {typeof provinces === 'object' &&
                provinces?.map((province: any) => (
                  <SelectedArea
                    key={province.id}
                    area={province.name}
                    onClick={() => {
                      toggleModalState(0)
                      dispatch({ type: actions.addProvince, payload: province.name })
                      setValue('provinceId', province.id, { shouldValidate: true })
                    }}
                  />
                ))}
            </OptionsModal>
          </div>
          <div className="relative w-full">
            <Input
              label="Município"
              errorMessage={errors.countyId?.message}
              inputType="text"
              onClick={() => {
                toggleModalState(1)
              }}
              chevronState={state.chevronState === 1}
              placeholder={'Município'}
              option
              value={state.county}
              {...register('countyId')}
            />
            <OptionsModal modalState={state.modalState === 1}>
              {typeof counties === 'object' &&
                counties?.map((county: any) => (
                  <SelectedArea
                    key={county.id}
                    area={county.name}
                    onClick={() => {
                      toggleModalState(1)
                      dispatch({ type: actions.addCounty, payload: county.name })
                      setValue('countyId', county.id, { shouldValidate: true })
                    }}
                  />
                ))}
            </OptionsModal>
          </div>
        </div>
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
        <div className="flex flex-col sm:flex-row w-full gap-5 md:gap-3">
          <Input
            label="Natural"
            errorMessage={errors.natural?.message}
            inputType="text"
            placeholder="Natural"
            {...register('natural')}
          />
          <Input
            label="Residência"
            errorMessage={errors.residence?.message}
            inputType="text"
            placeholder="Residência"
            {...register('residence')}
          />
        </div>
        <div className="flex  flex-col sm:flex-row w-full gap-5 md:gap-3">
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
          <Button type="submit" content="Próximo" />
        </div>
      </form>
    </>
  )
}

export { Form }
