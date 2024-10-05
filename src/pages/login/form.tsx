import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { UseLogin } from '../../hooks/useLogin'
import { CircleNotch, Eye, EyeClosed } from 'phosphor-react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from '../../components/progress-bar'

const Form = () => {
  const { mutate: useLogin, isLoading } = UseLogin()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const token = Cookies.get('token')
  const role = Cookies.get('role')
  const navigate = useNavigate()
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

  useEffect(() => {
    if (token && role) {
      if (role === 'STUDENT') {
        navigate('/aluno/relatorio-de-notas')
      } else if (role === 'ADMIN' || role === 'TEACHER' || role === 'EMPLOYEE') {
        navigate('/admin/painel')
      }
    }
  }, [navigate, token, role])

  const onSubmit = async (data: any) => {
    try {
      useLogin({ loginData: data })
    } catch (error) {
      console.log(error)
    }
  }

  if (token && role) {
    return <ProgressBar />
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
        placeholder="Digite a sua palavra-passe"
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
