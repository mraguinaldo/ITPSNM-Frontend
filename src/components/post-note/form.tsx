import { useEffect, useReducer } from 'react'
import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { SelectedArea } from '../../components/selected-area'
import { initialValues, Levels, quarters } from './data'

import { OptionsModal } from '../../components/modals/options-modal'
import { reducer } from './reducer'
import { actions } from './actions'

import { UseCheckEnrollment } from '../../hooks/useCheckEnrollment'
import { ProgressBar } from '../progress-bar'
import { Link, useSearchParams } from 'react-router-dom'
import { UseRenameClass } from '../../hooks/useRenameClass'
import { ArrowLeft } from 'phosphor-react'
import { UseCreateFormData } from '../../hooks/useCreateFormData'

import { UseGetData } from '../../hooks/useGetData'
import { UsePostNote } from '../../hooks/usePostNote'
import { Toast } from '../toast'
import { UseFetchSubjects } from '../../hooks/useFetchSubjects'

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const [, setSearchParams] = useSearchParams()
  const identityCardNumber = UseGetData('chosenStudent')

  const { mutate: useCheckEnrollment, data: enrollmentFound, isLoading: searchingEnrollment } = UseCheckEnrollment()
  const { mutate: usePostNote, isLoading: LaunchingNote, error, isSuccess } = UsePostNote()
  const { data: subjects }: any = UseFetchSubjects()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      quarter: '',
      subjectId: undefined,
      level: undefined,
      p1: undefined,
      p2: undefined,
      pt: undefined,
      resource: undefined,
      nee: undefined,
      ims: undefined,
    },
  })

  const toggleModalState = (value: number) => {
    dispatch({ type: actions.toggleModalState, payload: state.modalState !== value ? value : 100 })
    dispatch({ type: actions.changeStateOfChevron, payload: state.modalState !== value ? value : 100 })
  }

  const onSubmit = (data: any) => {
    try {
      const enrollmentId = enrollmentFound?.enrollment.id || 0
      let formData: any

      if (data.quarter === 'FIRST') {
        formData = UseCreateFormData(data, enrollmentId, 'pf')
      } else if (data.quarter === 'SECOND') {
        formData = UseCreateFormData(data, enrollmentId, 'ps')
      } else if (data.quarter === 'THIRD') {
        formData = UseCreateFormData(data, enrollmentId, 'pt')
      }

      if (formData) usePostNote({ formData })
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
    if (error) {
      Toast({ message: 'Erro ao lançar a nota!', theme: 'colored', toastType: 'error' })
    }
    if (isSuccess) {
      Toast({ message: 'Nota lançada 🥳', theme: 'light', toastType: 'success' })
      reset()
      dispatch({ type: actions.reset })
    }
  }, [error, isSuccess, reset])

  return (
    <section className="flex gap-6 flex-col w-full px-8 py-16 lg:p-11 lg:rounded-[16px] bg-white">
      {(searchingEnrollment || LaunchingNote) && <ProgressBar />}
      <Link to="/admin/painel" className="hover:bg-slate-300 rounded-full p-2 w-fit">
        <ArrowLeft size={18} />
      </Link>
      <div>
        <h1 className="text-[24px] font-semibold">{enrollmentFound?.enrollment.students.fullName}</h1>
        <div className="flex flex-wrap gap-4">
          <p>{UseRenameClass(enrollmentFound?.enrollment.levels.name || '')}</p>
          <p>
            <strong>Curso: </strong> {enrollmentFound?.enrollment.courses.name}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 flex-col w-full">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex w-full gap-3">
            <div className="relative w-full">
              <Input
                label="Trimestre"
                errorMessage={errors.quarter?.message}
                inputType="text"
                onClick={() => {
                  toggleModalState(0)
                }}
                chevronState={state.chevronState === 0}
                placeholder={'Escolha o trimestre...'}
                value={state.quarter}
                option
                {...register('quarter')}
              />
              <OptionsModal modalState={state.modalState === 0}>
                {quarters.map(({ content, id, quarter }) => (
                  <SelectedArea
                    key={id}
                    area={content}
                    onClick={() => {
                      toggleModalState(100)
                      dispatch({ type: actions.toggleQuarter, payload: content })
                      setValue('quarter', quarter, { shouldValidate: true })
                    }}
                  />
                ))}
              </OptionsModal>
            </div>
          </div>
          <div className="flex w-full gap-3">
            <div className="relative w-full">
              <Input
                label="Disciplina"
                errorMessage={errors.subjectId?.message}
                inputType="text"
                onClick={() => {
                  toggleModalState(1)
                }}
                chevronState={state.chevronState === 1}
                placeholder={'Escolha a disciplina...'}
                value={state.subject}
                option
                {...register('subjectId')}
              />
              <OptionsModal modalState={state.modalState === 1} maximumHeight={true}>
                {subjects?.map((subject: any) => (
                  <SelectedArea
                    key={subject.id}
                    area={subject.name}
                    onClick={() => {
                      toggleModalState(100)
                      dispatch({ type: actions.switchSubject, payload: subject.name })
                      setValue('subjectId', subject.id, { shouldValidate: true })
                    }}
                  />
                ))}
              </OptionsModal>
            </div>
          </div>
          <div className="flex w-full gap-3">
            <div className="relative w-full">
              <Input
                label="Classe"
                errorMessage={errors.level?.message}
                inputType="text"
                onClick={() => {
                  toggleModalState(2)
                }}
                chevronState={state.chevronState === 2}
                placeholder={'Escolha a classe...'}
                value={state.level}
                option
                {...register('level')}
              />
              <OptionsModal modalState={state.modalState === 2}>
                {Levels.map(({ level, levelId, content }) => (
                  <SelectedArea
                    key={levelId}
                    area={content}
                    onClick={() => {
                      toggleModalState(100)
                      dispatch({ type: actions.changeLevel, payload: content })
                      setValue('level', level, { shouldValidate: true })
                    }}
                  />
                ))}
              </OptionsModal>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Input
            label="P1"
            errorMessage={errors.p1?.message}
            inputType="text"
            placeholder="Digite a nota da P1..."
            {...register('p1')}
            hiddenErrorMessage
          />
          <Input
            label="P2"
            errorMessage={errors.p2?.message}
            inputType="text"
            placeholder="Digite a nota da P2..."
            {...register('p2')}
            hiddenErrorMessage
          />
          <Input
            label="PT"
            errorMessage={errors.pt?.message}
            inputType="text"
            placeholder="Digite a nota da PT..."
            {...register('pt')}
            hiddenErrorMessage
          />
          <Input
            label="Recurso"
            errorMessage={errors.resource?.message}
            inputType="text"
            placeholder="Digite a nota do recurso..."
            {...register('resource')}
            hiddenErrorMessage
          />
          <Input
            label="NEE"
            errorMessage={errors.nee?.message}
            inputType="text"
            placeholder="Digite a nota do exame..."
            {...register('nee')}
            hiddenErrorMessage
          />
          <Input
            label="IMS"
            errorMessage={errors.ims?.message}
            inputType="text"
            placeholder="Digite a nota da prova prática..."
            {...register('ims')}
            hiddenErrorMessage
          />
        </div>

        <div className="pt-3 w-full">
          <Button isLoading={LaunchingNote} type="submit" content="Lançar nota" />
        </div>
      </form>
    </section>
  )
}

export { Form }
