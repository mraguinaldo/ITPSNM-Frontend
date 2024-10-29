import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { useEffect, useReducer, useState } from 'react'
import { ProgressBar } from '../progress-bar'

import { OptionsModal } from '../modals/options-modal'
import { initialValues } from './data'
import { reducer } from './reducer'
import { actions } from './actions'
import { SelectedArea } from '../selected-area'
import { Trash } from 'phosphor-react'
import { UseRegisterInvoice } from '../../hooks/userRegisterInvoice'
import { UseformatDate } from '../../hooks/useFormatDate'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const PAYMENT_TYPES = [
  { id: 0, paymentType: 'DECLARATION', content: 'Declaração' },
  { id: 1, paymentType: 'CERTIFICATE', content: 'Certificado' },
  { id: 2, paymentType: 'PASS', content: 'Passe de estudante' },
  { id: 3, paymentType: 'UNIFORM', content: 'Uniforme' },
  { id: 4, paymentType: 'TUITION', content: 'Mensalidade' },
  { id: 5, paymentType: 'TUITION_PENALTY', content: 'Multa de propina' },
]

const Form = () => {
  const employeeId: any = Cookies.get('employeeNumber')
  const [state, dispatch] = useReducer(reducer, initialValues)
  const [items, setItems] = useState([{ description: '', amount: '' }]);
  const redirectTo = useNavigate()

  const { mutate: useRegisterInvoice, isLoading: registeringTheInvoice, isSuccess } = UseRegisterInvoice()

  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
    defaultValues: {
      employeeId: undefined,
      enrollmentId: undefined,
      type: '',
      dueDate: undefined,
      issueDate: undefined,
      items: undefined,
      invoiceId: 0,
    },
  })

  const toggleModalState = (value: number) => {
    dispatch({ type: actions.toggleModalState, payload: state.modalState !== value ? value : 100 })
    dispatch({ type: actions.changeStateOfChevron, payload: state.modalState !== value ? value : 100 })
  }

  useEffect(() => {
    if (isSuccess) {
      reset()
      dispatch({ type: actions.reset })
      redirectTo('/admin/painel/faturas')
    }
  }, [isSuccess, reset])

  useEffect(() => {
    if (employeeId) {
      setValue('employeeId', employeeId, { shouldValidate: true })
    }
  }, [employeeId])

  useEffect(() => {
    const currentDate = new Date();

    const formattedDate: any = UseformatDate(currentDate)

    setValue('dueDate', formattedDate, { shouldValidate: true });
    setValue('issueDate', formattedDate, { shouldValidate: true });
    setValue('invoiceId', 12, { shouldValidate: true });

    const enrollmentNumber: any = Number(Cookies.get('enrollmentNumber'))

    if (enrollmentNumber) setValue('enrollmentId', enrollmentNumber, { shouldValidate: true });
  }, []);

  const handleRemoveItem = (currentItem: any) => {
    const currentItems: any = getValues('items');

    const updatedItems = currentItems.filter((_: any, index: number) =>
      index !== currentItem
    );

    unregister(`items.${currentItem}`);

    setValue('items', updatedItems);
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems((prevItems) => [...prevItems, { description: '', amount: '' }]);
  };

  const onSubmit = (data: any) => {
    try {
      useRegisterInvoice({ formData: data })
    } catch (err) {
      console.error('Erro ao submeter o formulário:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'flex gap-6 flex-col w-full'}>
      {registeringTheInvoice && <ProgressBar />}

      <div className="flex flex-col gap-5 sm:gap-3 sm:flex-row">
        <Input
          label="Número do estudante"
          errorMessage={errors.enrollmentId?.message}
          inputType="number"
          placeholder="Insira o nº do estudante"
          {...register('enrollmentId')}
        />
        <div className="relative w-full">
          <Input
            label="Tipo de pagamento"
            errorMessage={errors.type?.message}
            inputType="text"
            onClick={() => {
              toggleModalState(3)
            }}
            chevronState={state.chevronState === 3}
            placeholder={'Selecionar o tipo de pagamento'}
            value={state.status}
            option
            {...register('type')}
          />
          <OptionsModal modalState={state.modalState === 3}>
            {PAYMENT_TYPES.map(({ id, content, paymentType }) => (
              <SelectedArea
                key={id}
                area={content}
                onClick={() => {
                  toggleModalState(3)
                  dispatch({
                    type: actions.toggleStatus,
                    payload: content,
                  })
                  setValue('type', paymentType, { shouldValidate: true })
                }}
              />
            ))}
          </OptionsModal>
        </div>

      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[16px] text-[#2F2F2F] uppercase font-semibold">Itens a serem pagos</p>
        <div className='w-full flex flex-col gap-5'>
          {items.map((_, index) => (
            <div key={index} className="flex gap-6 sm:gap-3 justify-between flex-col sm:flex-row sm:items-end w-full">
              <div className='flex gap-5 flex-col sm:flex-row w-full'>
                <Input
                  label="Item"
                  inputType="text"
                  placeholder="Insira o item"
                  errorMessage={errors.items?.[index]?.description?.message}
                  {...register(`items.${index}.description`)}
                />
                <Input
                  label="Valor"
                  inputType="text"
                  placeholder="Insira o valor"
                  errorMessage={errors.items?.[index]?.amount?.message}
                  {...register(`items.${index}.amount`)}
                />
                <Input
                  label="Quantidade"
                  errorMessage={errors.items?.[index]?.qty?.message}
                  inputType="number"
                  placeholder="Insira a quantidade"
                  {...register(`items.${index}.qty`)}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="text-[12px] uppercase py-1 px-4 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc]"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
        </div>
        <div className='flex justify-between gap-2 pt-6'>

          <button type='button' onClick={addItem} className='text-[12px] uppercase border py-2 px-4 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc]'>
            Adicionar item
          </button>
        </div>
      </div>

      <div className="pt-3 w-full">
        <Button isLoading={registeringTheInvoice} type="submit" content="Efectuar pagamento" />
      </div>
    </form>
  )
}

export { Form }
