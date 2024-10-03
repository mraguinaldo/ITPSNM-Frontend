import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { useReducer } from 'react'
import { reducer } from './reducer'
import { initialValues } from './data'
import { actions } from './actions'
import { Eye, EyeClosed } from 'phosphor-react'

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const showUsername = false

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      newPassword: '',
      oldPassword: '',
      username: '',
    },
  })

  const onSubmit = (data: any) => {
    try {
      console.log('Dados submetidos:', data)
    } catch (err) {
      console.error('Erro ao submeter o formulário:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full'}>
      <div className="flex flex-col gap-5">
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
          label="Palavra-passe antiga"
          errorMessage={errors.oldPassword?.message}
          inputType={state.showPassword ? 'text' : 'password'}
          Icon={state.showPassword ? EyeClosed : Eye}
          iconClick={() => dispatch({ type: actions.changeInputType, payload: !state.showPassword })}
          placeholder="Digite a sua palavra-passe"
          {...register('oldPassword')}
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
        <Button type="submit" content="Atualizar" />
      </div>
    </form>
  )
}

export { Form }
