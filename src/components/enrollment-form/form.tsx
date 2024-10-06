import { useEffect, useReducer } from 'react'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { SelectedArea } from '../../components/selected-area'
import { LEVELS, initialValues } from './data'
import { RadioButton } from '../../components/radio-button'
import { OptionsModal } from '../../components/modals/options-modal'
import { reducer } from './reducer'
import { actions } from './actions'
import { UseGetData } from '../../hooks/useGetData'
import { Input } from '../../components/inputs/normal'
import { UseEnrollStudent } from '../../hooks/useEnrollStudent'
import { ProgressBar } from '../../components/progress-bar'
import { UseFetchCourses } from '../../hooks/useFetchCourses'
import { UsestoreData } from '../../hooks/useStoreData'

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const { data: courses } = UseFetchCourses()
  const { mutate: useEnrollStudent, isLoading } = UseEnrollStudent()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      identityCardNumber: '',
      courseId: undefined,
      levelId: undefined,
    },
  })

  const toggleModalState = (value: number) => {
    dispatch({ type: actions.toggleModalState, payload: state.modalState !== value ? value : 100 })
    dispatch({ type: actions.changeStateOfChevron, payload: state.modalState !== value ? value : 100 })
  }

  useEffect(() => {
    const data = UseGetData('IdentityCard')
    if (data) {
      setValue('identityCardNumber', data.identityCardNumber, { shouldValidate: true })
    }
  }, [setValue])

  const onSubmit = (data: any) => {
    try {
      useEnrollStudent({ formData: data })
      UsestoreData('enrollment', data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isLoading && <ProgressBar />}
      <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col'}>
        <Input
          label="Nº do Bilhete de Identidade"
          errorMessage={errors.identityCardNumber?.message}
          inputType="text"
          className="pointer-events-none"
          placeholder="Nº do Bilhete de Identidade"
          {...register('identityCardNumber')}
        />
        <div className="flex w-full gap-3">
          <div className="relative w-full">
            <Input
              label="Curso"
              errorMessage={errors.courseId?.message}
              inputType="text"
              onClick={() => {
                toggleModalState(0)
              }}
              chevronState={state.chevronState === 0}
              placeholder={'Curso'}
              value={state.course}
              option
              {...register('courseId')}
            />
            <OptionsModal modalState={state.modalState === 0}>
              {typeof courses === 'object' &&
                courses?.map((course: any) => (
                  <SelectedArea
                    key={course.id}
                    area={course.name}
                    onClick={() => {
                      toggleModalState(0)
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
        <div className="pt-3 w-full">
          <Button type="submit" content="Próximo" />
        </div>
      </form>
    </>
  )
}

export { Form }
