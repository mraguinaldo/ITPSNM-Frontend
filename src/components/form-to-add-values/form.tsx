import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { useEffect } from 'react'
import { ProgressBar } from '../progress-bar'

import Cookies from 'js-cookie'
import { UseAddvaluesToTheTransaction } from '../../hooks/use-add-values-to-the-transaction'

const FormToAddValuesToTheTransaction = ({ enrollmentId, paymentId }: { enrollmentId: any, paymentId: any }) => {
  const employeeId: any = Cookies.get('employeeNumber')

  const { mutate: useAddvaluesToTheTransaction, isLoading: addingValues, isSuccess } = UseAddvaluesToTheTransaction()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      employeeId: undefined,
      amount: undefined,
      enrollmentId: undefined,
      date: undefined,
      transactionNumber: undefined
    },
  })

  const onSubmit = (data: any) => {
    try {
      useAddvaluesToTheTransaction({ formData: data })
    } catch (err) {
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


  useEffect(() => {
    if (enrollmentId) {
      setValue('enrollmentId', enrollmentId, { shouldValidate: true })
    }
    if (employeeId) {
      setValue('employeeId', employeeId, { shouldValidate: true })
    }
    if (paymentId) {
      setValue('paymentId', paymentId, { shouldValidate: true })
    }
  }, [enrollmentId, employeeId, paymentId])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full px-4 py-3'}>
      {addingValues && <ProgressBar />}


      <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row">
        <Input
          label="Quantia"
          errorMessage={errors.amount?.message}
          inputType="number"
          placeholder="Insira a quantia"
          {...register('amount')}
        />
        <Input
          label="Data do recibo"
          errorMessage={errors.date?.message}
          inputType="date"
          placeholder="Data da transação"
          {...register('date')}
        />
      </div>

      <div>
        <Input
          label="Número do recibo"
          errorMessage={errors.transactionNumber?.message}
          inputType="text"
          placeholder="Insira o número do recibo"
          {...register('transactionNumber')}
        />
      </div>

      <div className="pt-3 w-full">
        <Button isLoading={addingValues} type="submit" content="Acrescentar valores" />
      </div>
    </form>
  )
}

export { FormToAddValuesToTheTransaction }
