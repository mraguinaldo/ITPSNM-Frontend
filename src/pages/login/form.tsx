import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { UseLogin } from '../../hooks/useLogin'
import { CircleNotch, Eye, EyeClosed } from 'phosphor-react'
import { useState } from 'react'

const Form = () => {
  const { mutate: useLogin, isLoading } = UseLogin()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: any) => {
    try {
      useLogin({ loginData: data })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full'}>
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
        inputType={showPassword ? 'text' : 'password'}
        Icon={showPassword ? EyeClosed : Eye}
        iconClick={() => setShowPassword((prev) => !prev)}
        placeholder="Digite a nova palavra-passe"
        {...register('password')}
      />
      <div className="pt-3 w-full">
        <Button
          type="submit"
          content={isLoading ? '' : 'Entrar'}
          Icon={isLoading && <CircleNotch size={18} className="animate-rotate" />}
        />
      </div>
    </form>
  )
}

export { Form }
