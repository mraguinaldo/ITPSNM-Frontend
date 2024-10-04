import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { useEffect, useReducer } from 'react'
import { reducer } from './reducer'
import { initialValues } from './data'
import { actions } from './actions'
import { Eye, EyeClosed } from 'phosphor-react'
import { UsePickUpAuthenticatedStudent } from '../../hooks/usePickUpAuthenticatedStudent'
import { UseResetPassword } from '../../hooks/useResetPassword'
import { ProgressBar } from '../progress-bar'
import { Toast } from '../toast'

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const user = UsePickUpAuthenticatedStudent()
  const { mutate: useResetPassword, isLoading: resettingThePassword, isSuccess } = UseResetPassword()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (data: any) => {
    try {
      const userData = {
        email: user.students.User.email,
        password: data.password,
      }
      useResetPassword({ formData: userData })
    } catch (err) {
      console.error('Erro ao submeter o formulário:', err)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      Toast({ message: 'Palavra-passe alterada com sucesso...', theme: 'colored', toastType: 'success' })
      reset()
    }
  }, [isSuccess, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full'}>
      {resettingThePassword && <ProgressBar />}
      <div className="flex flex-col gap-5">
        {/* <Input
          label="Palavra-passe antiga"
          errorMessage={errors.oldPassword?.message}
          inputType={state.showPassword ? 'text' : 'password'}
          Icon={state.showPassword ? EyeClosed : Eye}
          iconClick={() => dispatch({ type: actions.changeInputType, payload: !state.showPassword })}
          placeholder="Digite a sua palavra-passe"
          {...register('oldPassword')}
        /> */}
        <Input
          label="Nova palavra-passe"
          errorMessage={errors.password?.message}
          inputType={state.showPassword ? 'text' : 'password'}
          Icon={state.showPassword ? EyeClosed : Eye}
          iconClick={() => dispatch({ type: actions.changeInputType, payload: !state.showPassword })}
          placeholder="Digite a nova palavra-passe"
          {...register('password')}
        />
      </div>

      <div className="pt-3 w-full">
        <Button type="submit" content="Atualizar" />
      </div>
    </form>
  )
}

export { Form }
