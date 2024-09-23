import { useEffect, useReducer } from 'react'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { SelectedArea } from '../../components/selected-area'
import { COURSES, LEVELS, fields, initialValues } from './data'
import { RadioButton } from '../../components/radio-button'
import { OptionsModal } from '../../components/modals/options-modal'
import { reducer } from './reducer'
import { actions } from './actions'
import { useNavigate } from 'react-router-dom'
import { UsestoreData } from '../../hooks/useStoreData'
import { UseGetData } from '../../hooks/useGetData'
import { Input } from '../../components/inputs/normal'

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
      course: '',
      level: '',
    },
  })

  const toggleModalState = (value: number) => {
    dispatch({ type: actions.toggleModalState, payload: state.modalState !== value ? value : 100 })
    dispatch({ type: actions.changeStateOfChevron, payload: state.modalState !== value ? value : 100 })
  }

  const toggleLevel = (value: number) => {
    dispatch({ type: actions.toggleLevel, payload: value })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const data = UseGetData('IdentityCard')
    if (data) {
      setValue('fullName', data.fullName, { shouldValidate: true })
    }
  }, [])

  const onSubmit = (data: any) => {
    try {
      const formData = new FormData()

      fields.map((field) => {
        formData.append(field, data[field])
      })
      UsestoreData('studentData', formData)
      navigate('/register/document-form')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col'}>
      <Input
        label="Nome completo"
        errorMessage={errors.fullName?.message}
        inputType="text"
        placeholder="Nome completo"
        className="pointer-events-none"
        {...register('fullName')}
      />
      <div className="flex w-full gap-3">
        <div className="relative w-full">
          <Input
            label="Curso"
            errorMessage={errors.course?.message}
            inputType="text"
            onClick={() => {
              toggleModalState(0)
            }}
            chevronState={state.chevronState === 0}
            placeholder={'Curso'}
            option
            {...register('course')}
          />
          <OptionsModal modalState={state.modalState === 0}>
            {COURSES.map(({ id, course }) => (
              <SelectedArea
                key={id}
                area={course}
                onClick={() => {
                  toggleModalState(0)
                  dispatch({ type: actions.addCourse, payload: course })
                  setValue('course', course, { shouldValidate: true })
                }}
              />
            ))}
          </OptionsModal>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-[16px] font-medium text-[#2F2F2F]">Estado civil</p>
        {LEVELS.map(({ id, level }) => (
          <RadioButton
            key={id}
            value={level}
            checked={state.level === id}
            onClick={() => toggleLevel(id)}
            label={level}
            {...register('level')}
          />
        ))}
      </div>
      <div className="pt-3 w-full">
        <Button type="submit" content="Próximo" />
      </div>
    </form>
  )
}

export { Form }
