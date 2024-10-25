import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { useEffect } from 'react'
import { UseMakePayment } from '../../hooks/useMakePayment'
import { ProgressBar } from '../progress-bar'

import Cookies from 'js-cookie'

const Form = () => {
  const employeeId: any = Cookies.get('employeeNumber')

  const { mutate: useMakePayment, isLoading: makingThePayment, isSuccess } = UseMakePayment()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      invoiceId: undefined,
      employeeId: undefined,
      enrollmentId: undefined,
      transactionNumber: ''
    },
  })

  const onSubmit = (data: any) => {
    try {
      useMakePayment({ formData: data })
    } catch (err) {
      console.error('Erro ao submeter o formulário:', err)
    }
  }

  useEffect(() => {
    if (isSuccess) reset()
  }, [isSuccess, reset])

  useEffect(() => {
    if (employeeId) {
      setValue('employeeId', employeeId, { shouldValidate: true })
    }
  }, [employeeId])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full'}>
      {makingThePayment && <ProgressBar />}


      <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row">
        <Input
          label="Número do estudante"
          errorMessage={errors.enrollmentId?.message}
          inputType="number"
          placeholder="Insira o nº do estudante"
          {...register('enrollmentId')}
        />
        <Input
          label="Número da fatura"
          errorMessage={errors.invoiceId?.message}
          inputType="number"
          placeholder="Insira o nº da fatura"
          {...register('invoiceId')}
        />
        <Input
          label="Número da transação"
          errorMessage={errors.transactionNumber?.message}
          inputType="text"
          placeholder="Insira o número da transação"
          {...register('transactionNumber')}
        />
      </div>

      <div className="pt-3 w-full">
        <Button isLoading={makingThePayment} type="submit" content="Efectuar pagamento" />
      </div>
    </form>
  )
}

export { Form }
