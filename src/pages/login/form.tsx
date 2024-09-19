import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { UsestoreData } from '../../hooks/useStoreData'
import { schemaForm } from './schema'
import { UseCatchFakeUser } from '../../hooks/useCatchFakeUser'
import { Toast } from '../../components/toast'

const Form = () => {
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

  const onSubmit = (data: any) => {
    try {
      const formData = new FormData()

      const userFound = UseCatchFakeUser(data?.email, data?.password)

      if (userFound) {
        formData.append('email', data?.email)
        formData.append('password', data?.password)

        UsestoreData('LoginData', formData)
        navigate('/student/grade-view-area')
      } else {
        Toast({ message: 'Credências errada!', theme: 'colored', toastType: 'error' })
      }
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
        inputType="password"
        placeholder="Digite a sua palavra-passe"
        {...register('password')}
      />

      <div className="pt-3 w-full">
        <Button type="submit" content="Próximo" />
      </div>
    </form>
  )
}

export { Form }
