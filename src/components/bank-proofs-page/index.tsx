import { useReducer } from 'react'
import { ArrowLeft, CopySimple, MagnifyingGlass } from 'phosphor-react'
import { InputSearch } from '../inputs/search'
import { UseFetchStudentBankProof } from '../../hooks/useFetchStudentBankProof'
import { UseCopier } from '../../hooks/useCopier'
import { Link } from 'react-router-dom'
import { initialValues, TableHeaders, TRANSACTION_VIEW_OPTIONS } from './data'
import { ButtonForSearchOptions } from '../button-for-search-options'
import { reducer } from './reducer'
import { actions } from './actions'
import { TitleForProcessing } from '../title-for-processing'
import { HeaderContent } from './header-content'
import { TableRow } from './table-row'

const BankProofsPage = () => {
  const [state, dispatch] = useReducer(reducer, initialValues)
  const {
    error,
    isLoading,
    data: transactions,
    mutate: useFetchStudentBankProof
  }: any = UseFetchStudentBankProof()

  const handleFetchStudentBankProof = () => {
    useFetchStudentBankProof({
      searchType: state?.searchType,
      enrollmentId: state?.enrollmentId
    })
  }

  const searchStudent = (e: any) => e.key === 'Enter' && handleFetchStudentBankProof()

  const getTransactionByState = (state: boolean) => {
    return transactions?.
      transactions?.
      items?.
      filter((transaction: any) =>
        transaction?.used === state
      )
  }

  let transactionsUsed = getTransactionByState(true)
  let transactionsValid = getTransactionByState(false)

  const RenderTransactionRow = (transaction: any) => (
    <tr
      key={transaction.id}
      className={`${state?.currentTransactionType === 'ALL' ? '' :
        state?.currentTransactionType === 'USED' && transaction?.used ? '' :
          state?.currentTransactionType === 'VALID' && !transaction?.used ? '' : 'hidden'}`}
    >
      <td className="border-y border-gray-300 px-4 py-2 text-center">
        <div
          className={`py-1 px-4 rounded-full text-black ${transaction.used ? 'bg-[#da606024]' : 'bg-[#7784e25a]'}`}
        >
          {transaction.used ? 'Usado' : 'Válido'}
        </div>
      </td>
      <TableRow content={`${transaction.amount}Kz`} />
      <TableRow content={transaction.enrollmentId} />
      <TableRow content={transaction.employeeId} />

      <td className="border-y border-gray-300 px-4 py-2">
        <div className="flex items-center gap-2 justify-between">
          <span id={`${transaction.id}NumeroDaTransacao`}>
            {transaction.transactionNumber}
          </span>
          <CopySimple
            size={18}
            className="cursor-pointer"
            onClick={() =>
              UseCopier({
                elementId: `${transaction.id}NumeroDaTransacao`,
                message: 'Número do comprovativo copiado',
              })
            }
          />
        </div>
      </td>

      <TableRow content={`${transaction.paymentId ? transaction.paymentId : '- - -'}`} />
      <TableRow content={new Date(transaction.date).toLocaleDateString()} />
      <TableRow content={new Date(transaction.date).toLocaleTimeString()} />
    </tr>
  )

  return (
    <div className={`w-full p-6 py-16 lg:pt-11 lg:pb-32 lg:rounded-[16px] bg-white flex gap-6 flex-col ${transactions ? 'h-fit' : 'h-dvh'}`}>

      <Link
        to='/admin/painel/pagamentos'
        className="hover:bg-slate-300 rounded-full p-2 w-fit"
      >
        <ArrowLeft size={18} />
      </Link>

      <h1 className="text-[24px] lg:text-[32px] font-semibold leading-9">
        Comprovativos
      </h1>

      <div id="search__area" className="flex flex-col gap-4 items-center relative w-full">
        <div className="flex gap-4 flex-wrap w-full justify-between">
          <ButtonForSearchOptions
            content={'Nº de inscrição'}
            option={state?.searchType === 'enrollmentId'}
            onClick={() => {
              dispatch({ type: actions.changeSearchType, payload: 'enrollmentId' }),
                dispatch({ type: actions.changeCurrentTransactionType, payload: 'ALL' })
            }}
          />

          <ButtonForSearchOptions
            content={'Nº do comprovativo'}
            option={state?.searchType !== 'enrollmentId'}
            onClick={() => {
              dispatch({ type: actions.changeSearchType, payload: 'transactionNumber' }),
                dispatch({ type: actions.changeCurrentTransactionType, payload: 'ALL' })
            }}
          />
        </div>
        <InputSearch
          placeholder={state?.searchType === "enrollmentId" ? 'Insira o número de inscrição do aluno...' : 'Insira o número da transação...'}
          className="flex-row-reverse"
          icon={
            <MagnifyingGlass
              id="search-icon"
              className="cursor-pointer p-1 hover:bg-slate-200 rounded-full flex items-center justify-center"
              color="#000000"
              size={24}
              onClick={handleFetchStudentBankProof}
            />
          }
          value={state?.enrollmentId}
          onKeyDown={(e: any) => searchStudent(e)}
          onChange={(e: any) =>
            dispatch({ type: actions.toggleEnrollmentId, payload: e.target.value })}
        />
      </div>

      {transactions && <div className="flex gap-4 flex-wrap">
        {TRANSACTION_VIEW_OPTIONS.map(({ id, content, transactionType }) => (
          <ButtonForSearchOptions
            key={id}
            option={state?.currentTransactionType === transactionType}
            searchType={state?.searchType === 'transactionNumber'}
            onClick={() =>
              dispatch({
                type: actions.changeCurrentTransactionType,
                payload: transactionType
              })
            }
            content={`${content}
                ( ${transactionType === 'ALL' ? transactions?.transactions?.items?.length : transactionType === 'USED' ? transactionsUsed?.length : transactionsValid?.length} )`
            }
          />
        ))}
      </div>}

      <div className='overflow-x-scroll'>
        <table className="table-auto w-full border-collapse border-y border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {TableHeaders.map(({ id, label }) => (
                <HeaderContent label={label} key={id} />
              ))}
            </tr>
          </thead>
          <tbody>
            {
              transactions && !transactions?.transactions?.items ? RenderTransactionRow(transactions) : transactions?.transactions.items?.map(RenderTransactionRow)
            }
          </tbody>
        </table>
      </div>

      {isLoading &&
        <TitleForProcessing
          title={`Buscando ${state?.searchType === 'enrollmentId' ? 'comprovativos...' : 'comprovativo...'}`}
        />
      }
      {error &&
        <TitleForProcessing
          title='Comprovativos não encontrados 😢'
        />
      }
    </div >
  )
}

export { BankProofsPage }
