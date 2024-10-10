import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { useEffect, useReducer } from 'react'
import { reducer } from './reducer'
import { initialValues, roles } from './data'
import { actions } from './actions'
import { OptionsModal } from '../modals/options-modal'
import { SelectedArea } from '../selected-area'
import { Eye, EyeClosed } from 'phosphor-react'
import { UseCreateUser } from '../../hooks/useCreateUser'
import { Toast } from '../toast'
import { ProgressBar } from '../progress-bar'

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const { mutate: useCreateUser, isLoading: creatingUser, isSuccess } = UseCreateUser()
  const showUsername = false

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      email: '',
      password: '123456',
      role: '',
      username: '',
      currentUserId: undefined,
    },
  })

  const toggleModalState = (value: number) => {
    dispatch({
      type: actions.toggleModalState,
      payload: state.modalState !== value ? value : 100,
    })
    dispatch({
      type: actions.changeStateOfChevron,
      payload: state.modalState !== value ? value : 100,
    })
  }

  const onSubmit = (data: any) => {
    try {
      const { currentUserId, ...rest } = data

      const renamedData = {
        ...rest,
        [data.role === 'TEACHER' || data.role === 'ADMIN' ? 'employeeId' : 'enrollmentId']: currentUserId,
      }

      useCreateUser({ formData: renamedData })
    } catch (err) {
      console.error('Erro ao submeter o formulário:', err)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      Toast({ message: 'Usuário criado 🥳', theme: 'light', toastType: 'success' })
      reset()
      dispatch({ type: actions.reset })
    }
  }, [isSuccess, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full'}>
      {creatingUser && <ProgressBar />}

      <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row">
        <div className="relative w-full">
          <Input
            label="Tipo de usuário"
            errorMessage={errors.role?.message}
            inputType="text"
            value={state.role}
            onClick={() => {
              toggleModalState(0)
            }}
            chevronState={state.chevronState === 0}
            placeholder={'Escolha o tipo de usuário'}
            option
            {...register('role')}
          />
          <OptionsModal modalState={state.modalState === 0}>
            {roles?.map(({ content, id, role }) => (
              <SelectedArea
                key={id}
                area={content}
                onClick={() => {
                  toggleModalState(0)
                  dispatch({ type: actions.toggleUserType, payload: content })
                  setValue('role', role, { shouldValidate: true })
                }}
              />
            ))}
          </OptionsModal>
        </div>
        <Input
          label="Nº de inscrição"
          errorMessage={errors.currentUserId?.message}
          inputType="number"
          placeholder="Insira o nº de inscrição"
          {...register('currentUserId')}
        />
      </div>

      <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row">
        {showUsername && (
          <Input
            label="Nome de usuário"
            errorMessage={errors.username?.message}
            inputType="text"
            placeholder="Insira o nome de usuário"
            {...register('username')}
          />
        )}
        <Input
          label="E-mail"
          errorMessage={errors.email?.message}
          inputType="email"
          placeholder="Insira o seu email"
          {...register('email')}
        />
        <Input
          label="Palavra-passe"
          errorMessage={errors.password?.message}
          inputType={state.showPassword ? 'text' : 'password'}
          Icon={state.showPassword ? EyeClosed : Eye}
          iconClick={() => dispatch({ type: actions.changeInputType, payload: !state.showPassword })}
          placeholder="Digite a sua palavra-passe"
          {...register('password')}
        />
      </div>

      <div className="pt-3 w-full">
        <Button type="submit" content="Criar usuário" />
      </div>
    </form>
  )
}

export { Form }
