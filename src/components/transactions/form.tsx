import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { useEffect } from 'react'

import { ProgressBar } from '../progress-bar'
import { UseSendTransaction } from '../../hooks/useSendTransaction'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { UsestoreData } from '../../hooks/useStoreData'

const Form = () => {
  const queryClient = useQueryClient()
  const employee: any = queryClient.getQueryData(['employee'])
  const redirectTo = useNavigate()
  const { mutate: useSendTransaction, isLoading: sendingTheTransaction, isSuccess: transactionSent }: any = UseSendTransaction()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      amount: undefined,
      date: undefined,
      employeeId: undefined,
      enrollmentId: undefined,
      transactionNumber: ''
    },
  })

  const onSubmit = (data: any) => {
    try {
      const currentDate = new Date(data.date);
      const currentTime = new Date();

      currentDate.setHours(currentTime.getHours());
      currentDate.setMinutes(currentTime.getMinutes());
      currentDate.setSeconds(currentTime.getSeconds());

      const updatedData = {
        ...data,
        date: currentDate,
      };

      useSendTransaction({ formData: updatedData })
    } catch (err) {
      console.error('Erro ao submeter o formulário:', err)
    }
  }

  useEffect(() => {
    if (transactionSent) {
      reset()
      redirectTo('/admin/painel/pagamentos')
      UsestoreData('activeLink', 7)
    }
  }, [transactionSent, reset])

  useEffect(() => {
    if (employee) {
      setValue('employeeId', employee?.employee.id, { shouldValidate: true })
    }
  }, [employee])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full'}>
      {sendingTheTransaction && <ProgressBar />}

      <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row">
        <Input
          label="Número do funcionário"
          errorMessage={errors.employeeId?.message}
          inputType="number"
          placeholder="Insira o nº do funcionário"
          {...register('employeeId')}
        />
        <Input
          label="Número do estudante"
          errorMessage={errors.enrollmentId?.message}
          inputType="number"
          placeholder="Insira o nº do estudante"
          {...register('enrollmentId')}
        />
      </div>

      <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row">
        <Input
          label="Quantia"
          errorMessage={errors.amount?.message}
          inputType="number"
          placeholder="Insira a quantia"
          {...register('amount')}
        />
        <Input
          label="Número da transação"
          errorMessage={errors.transactionNumber?.message}
          inputType="text"
          placeholder="Insira o número da transação"
          {...register('transactionNumber')}
        />
        <Input
          label="Data da transação"
          errorMessage={errors.date?.message}
          inputType="date"
          placeholder="Data da transação"
          {...register('date')}
        />
      </div>

      <div className="pt-3 w-full">
        <Button isLoading={sendingTheTransaction} type="submit" content="Enviar a transação" />
      </div>
    </form>
  )
}

export { Form }
