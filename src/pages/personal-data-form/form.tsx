import { useReducer } from 'react'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { SelectedArea } from '../../components/selected-area'
import { COUNTIES, GENRES, MARITAL_STATUS, PROVINCES, dateFields, fields, initialValues } from './data'
import { RadioButton } from '../../components/radio-button'
import { OptionsModal } from '../../components/modals/options-modal'
import { reducer } from './reducer'
import { actions } from './actions'
import { UseformatDate } from '../../hooks/useFormatDate'
import { useNavigate } from 'react-router-dom'
import { UsestoreData } from '../../hooks/useStoreData'

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      fullName: '',
      county: '',
      dateOfBirth: undefined,
      father: '',
      gender: '',
      alternativePhone: '',
      phone: '',
      // email: '',
      height: '',
      emissionDate: undefined,
      identityCardNumber: '',
      maritalStatus: '',
      mother: '',
      natural: '',
      province: '',
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
      const formData = new FormData()

      dateFields.map((field) => {
        formData.append(field, UseformatDate(data[field]))
      })

      fields.map((field) => {
        formData.append(field, data[field])
      })
      UsestoreData('IdentityCard', formData)
      navigate('/register/enrollment-form')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full'}>
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
      <Input
        label="Nº do bilhete de identidade"
        errorMessage={errors.identityCardNumber?.message}
        inputType="text"
        placeholder="Bilhete de identidade"
        {...register('identityCardNumber')}
      />
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
        {GENRES.map(({ id, gender }) => (
          <RadioButton
            key={id}
            value={gender}
            checked={state.gender === id}
            onClick={() => changeGender(id)}
            label={gender}
            {...register('gender')}
          />
        ))}
      </div>
      {/* <Input
        label="E-mail atual"
        errorMessage={errors.email?.message}
        inputType="email"
        placeholder="E-mail"
        {...register('email')}
      /> */}
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
            errorMessage={errors.province?.message}
            inputType="text"
            onClick={() => {
              toggleModalState(0)
            }}
            chevronState={state.chevronState === 0}
            placeholder={'Província'}
            option
            {...register('province')}
          />
          <OptionsModal modalState={state.modalState === 0}>
            {PROVINCES.map(({ id, province }) => (
              <SelectedArea
                key={id}
                id={id}
                area={province}
                onClick={() => {
                  toggleModalState(0)
                  dispatch({ type: actions.addProvince, payload: province })
                  setValue('province', province, { shouldValidate: true })
                }}
              />
            ))}
          </OptionsModal>
        </div>
        <div className="relative w-full">
          <Input
            label="Município"
            errorMessage={errors.county?.message}
            inputType="text"
            onClick={() => {
              toggleModalState(1)
            }}
            chevronState={state.chevronState === 1}
            placeholder={'Município'}
            option
            {...register('county')}
          />
          <OptionsModal modalState={state.modalState === 1}>
            {COUNTIES.map(({ id, county }) => (
              <SelectedArea
                key={id}
                id={id}
                area={county}
                onClick={() => {
                  toggleModalState(1)
                  dispatch({ type: actions.addProvince, payload: county })
                  setValue('county', county, { shouldValidate: true })
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
          option
          {...register('maritalStatus')}
        />
        <OptionsModal modalState={state.modalState === 3}>
          {MARITAL_STATUS.map(({ id, maritalStatus }) => (
            <SelectedArea
              key={id}
              id={id}
              area={maritalStatus}
              onClick={() => {
                toggleModalState(3)
                dispatch({ type: actions.toggleMaritalStatus, payload: maritalStatus })
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
  )
}

export { Form }
