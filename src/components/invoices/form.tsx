import { Input } from '../../components/inputs/normal'
import { Button } from '../../components/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForm } from './schema'
import { useEffect, useReducer, useState } from 'react'
import { ProgressBar } from '../progress-bar'

import { OptionsModal } from '../modals/options-modal'
import { initialValues, LEVELS, MONTHS } from './data'
import { reducer } from './reducer'
import { actions } from './actions'
import { SelectedArea } from '../selected-area'
import { Trash } from 'phosphor-react'
import { UseRegisterInvoice } from '../../hooks/userRegisterInvoice'
import { UseformatDate } from '../../hooks/useFormatDate'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { RadioButton } from '../radio-button'
import { UseFetchItemsPrices } from '../../hooks/useFetchItemsPrices'
import { Toast } from '../toast'

const PAYMENT_TYPES = [
  { id: 0, paymentType: 'DECLARATION', content: 'Declaração' },
  { id: 1, paymentType: 'CERTIFICATE', content: 'Certificado' },
  { id: 2, paymentType: 'PASS', content: 'Passe de estudante' },
  { id: 3, paymentType: 'UNIFORM', content: 'Uniforme' },
  { id: 4, paymentType: 'TUITION', content: 'Propina' },
  { id: 5, paymentType: 'TUITION_PENALTY', content: 'Multa de propina' },
]

const Form = () => {
  const employeeId: any = Cookies.get('employeeNumber')
  const [state, dispatch] = useReducer(reducer, initialValues)
  const [items, setItems] = useState([{ description: '', amount: '' }]);

  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const redirectTo = useNavigate()

  const { mutate: useRegisterInvoice, isLoading: registeringTheInvoice, isSuccess } = UseRegisterInvoice()

  const { data: itemsPrices }: any = UseFetchItemsPrices()

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
      levelId: undefined,
      dueDate: undefined,
      issueDate: undefined,
      items: [{ description: undefined, itemPriceId: undefined, qty: undefined, month: [] }],
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

  const resetOptionsForMonths = () => {
    dispatch({ type: actions.toggleMonthIndex, payload: null })
    dispatch({ type: actions.selectField, payload: null })
    setSelectedMonths([])
  }

  const handleRemoveItem = (currentItem: any) => {
    const currentItems: any = getValues('items');

    const updatedItems = currentItems.filter((_: any, index: number) =>
      index !== currentItem
    );

    unregister(`items.${currentItem}`);

    setValue('items', updatedItems);
    setItems(updatedItems);

    if (setSelectedMonths.length === 1) resetOptionsForMonths()
  };

  const addItem = () => {
    setItems((prevItems) => [...prevItems, { description: '', amount: '' }]);
  };

  const toggleMonth = (currentMonth: string) => {
    setSelectedMonths((prev) => {
      const isSelected = prev.includes(currentMonth);
      const updatedMonths = isSelected
        ? prev.filter((month) => month !== currentMonth)
        : [...prev, currentMonth];

      return updatedMonths;
    });
  };

  useEffect(() => {
    setValue(`items.${state?.monthIndex}.month`, selectedMonths, { shouldValidate: true });

    if (state?.paymentType === 'Propina') {
      setValue(`items.${state?.monthIndex}.qty`, selectedMonths.length, { shouldValidate: true });
    } else {
      setValue(`items.${state?.monthIndex}.qty`, 1, { shouldValidate: true });
    }

  }, [selectedMonths, state]);

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
              toggleModalState(400)
            }}
            chevronState={state.chevronState === 400}
            placeholder={'Selecionar o tipo de pagamento'}
            value={state.paymentType}
            option
            {...register('type')}
          />
          <OptionsModal modalState={state.modalState === 400}>
            {PAYMENT_TYPES.map(({ id, content, paymentType }) => (
              <SelectedArea
                key={id}
                area={content}
                onClick={() => {
                  toggleModalState(400)
                  setSelectedMonths([])
                  dispatch({
                    type: actions.togglePaymentType,
                    payload: content,
                  })
                  setValue('type', paymentType, { shouldValidate: true })
                }}
              />
            ))}
          </OptionsModal>
        </div>
      </div>
      <div className='flex gap-3 flex-col relative mb-3'>
        <p className="text-[16px] font-medium text-[#2F2F2F]">Classe</p>
        <div className="flex flex-wrap gap-3">
          {LEVELS.map(({ id, level }) => (
            <RadioButton
              key={id}
              value={id}
              checked={state.level === id}
              onClick={() => { dispatch({ type: actions.toggleLevel, payload: id }), setValue('levelId', id, { shouldValidate: true }) }}
              label={level}
              {...register('levelId')}
            />
          ))}
        </div>
        <span className='text-[12px] sm:text-[14px] text-[#FB7373] absolute bottom-[-28px] font-medium'>{errors.levelId?.message}</span>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[16px] text-[#2F2F2F] uppercase font-semibold">Itens a serem pagos</p>
        <div className='w-full flex flex-col gap-5'>
          {items.map((_, index) => (
            <div key={index} className="flex gap-6 flex-col">
              <div className='flex gap-5 flex-col sm:flex-row w-full'>
                <div className="relative w-full">
                  <Input
                    label="Item"
                    errorMessage={errors.items?.[index]?.description?.message}
                    inputType="text"
                    onClick={() => {
                      toggleModalState(index)
                    }}
                    chevronState={state.chevronState === index}
                    placeholder="Insira o item"
                    option
                    {...register(`items.${index}.description`)}
                  />
                  <OptionsModal modalState={state.modalState === index} maximumHeight={true}>
                    {itemsPrices && itemsPrices?.map((item: any) => (
                      <SelectedArea
                        key={item?.id}
                        area={item?.itemName}
                        onClick={() => {
                          toggleModalState(index)
                          if (state?.selectedField === null && item?.itemName === 'Propina') {
                            dispatch({ type: actions.selectField, payload: index })
                          }
                          if (item?.itemName === 'Propina' && state?.selectedField !== null) {
                            Toast({ message: "Já existe um campo para propina", theme: "light", toastType: "warning" })
                          } else {
                            setValue(`items.${index}.itemPriceId`, item?.id, { shouldValidate: true })
                            setValue(`items.${index}.description`, item?.itemName, { shouldValidate: true })
                          }
                        }}
                      />
                    ))}
                  </OptionsModal>
                </div>
                <div hidden>
                  <Input
                    label="Valor"
                    inputType="text"
                    placeholder="Insira o valor"
                    errorMessage={errors.items?.[index]?.itemPriceId?.message}
                    {...register(`items.${index}.itemPriceId`)}
                  />
                </div>

                <div className={`w-full sm:w-fit ${state?.selectedMonth === index ? 'pointer-events-none cursor-default' : 'pointer-events-auto cursor-text'}`}>
                  <Input
                    label="Quantidade"
                    errorMessage={errors.items?.[index]?.qty?.message}
                    inputType="number"
                    placeholder="Insira a quantidade"
                    hiddenErrorMessage
                    {...register(`items.${index}.qty`)}
                  />
                </div>
              </div>

              <div className='flex w-full gap-4 items-end'>
                {state?.selectedField === index && <div className='flex w-full flex-col gap-2'>
                  <h2>MESES</h2>
                  <div className="grid grid-cols-2 xl:grid-cols-3 w-full">
                    {MONTHS.map(({ id, name, content }) => (
                      <div key={id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedMonths.includes(name)}
                          onChange={() => {
                            dispatch({ type: actions.toggleMonthIndex, payload: index })
                            toggleMonth(name);
                          }}
                          className="mr-2"
                        />
                        <span>{content}</span>
                      </div>
                    ))}
                  </div>
                </div>}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-[12px] uppercase p-2 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc]"
                >
                  <Trash size={18} />
                </button>
              </div>
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
        <Button isLoading={registeringTheInvoice} type="submit" content="Cadastrar fatura" />
      </div>
    </form>
  )
}

export { Form }
