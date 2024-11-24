import { Input } from '../inputs/normal'
import { Button } from '../button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { useEffect, useReducer } from 'react'
import { reducer } from './reducer'
import { initialValues } from './data'
import { actions } from './actions'
import { Eye, EyeClosed } from 'phosphor-react'
import { UseResetPassword } from '../../hooks/useResetPassword'
import { ProgressBar } from '../progress-bar'
import { Toast } from '../toast'

const PasswordUpdateForm = ({ email }: { email: any }) => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const {
    isSuccess,
    mutate: useResetPassword,
    isLoading: resettingThePassword
  } = UseResetPassword()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      newPassword: '',
      currentPassword: '',
    },
  })

  const onSubmit = (data: any) => {
    try {
      const userData = {
        email: email,
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
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
    <section className="w-full max-w-[400px] z-[200] bg-white p-6 rounded-[8px]">
      <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full'}>
        {resettingThePassword && <ProgressBar />}
        <div className="flex flex-col gap-5">
          <Input
            label="Palavra-passe antiga"
            errorMessage={errors.currentPassword?.message}
            inputType={state.showPassword ? 'text' : 'password'}
            Icon={state.showPassword ? EyeClosed : Eye}
            iconClick={() => dispatch({ type: actions.changeInputType, payload: !state.showPassword })}
            placeholder="Digite a palavra-passe antiga"
            {...register('currentPassword')}
          />
          <Input
            label="Nova palavra-passe"
            errorMessage={errors.newPassword?.message}
            inputType={state.showPassword ? 'text' : 'password'}
            Icon={state.showPassword ? EyeClosed : Eye}
            iconClick={() => dispatch({ type: actions.changeInputType, payload: !state.showPassword })}
            placeholder="Digite a nova palavra-passe"
            {...register('newPassword')}
          />
        </div>

        <div className="pt-3 w-full">
          <Button isLoading={resettingThePassword} type="submit" content="Atualizar" />
        </div>
      </form>
    </section>
  )
}

export { PasswordUpdateForm }
