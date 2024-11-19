import { useState } from 'react'
import { ArrowLeft, CopySimple, MagnifyingGlass } from 'phosphor-react'
import { InputSearch } from '../inputs/search'
import { UseFetchStudentBankProof } from '../../hooks/useFetchStudentBankProof'
import { UseCopier } from '../../hooks/useCopier'
import { Link } from 'react-router-dom'
import { TRANSACTION_VIEW_OPTIONS } from './data'

const BankProofsPage = () => {
  const { mutate: useFetchStudentBankProof, isLoading, data: transactions, error }: any = UseFetchStudentBankProof()
  const [enrollmentId, setEnrollmentId] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('enrollmentId')
  const [currentTransactionType, setCurrentTransactionType] = useState<string>('ALL')

  const handleFetchStudentBankProof = () => {
    useFetchStudentBankProof({ searchType, enrollmentId })
  }

  const searchStudent = (e: any) => {
    if (e.key === 'Enter') {
      handleFetchStudentBankProof()
    }
  }

  let transactionsUsed = transactions?.transactions?.items.filter((transaction: any) => transaction?.used === true)

  let transactionsValid = transactions?.transactions?.items.filter((transaction: any) => transaction?.used === false)

  const RenderTransactionCard = (transaction: any) => (
    <div key={transaction.id} className={`${currentTransactionType === 'ALL' ? 'flex' : currentTransactionType === 'USED' && transaction?.used ? 'flex' : currentTransactionType === 'VALID' && !transaction?.used ? 'flex' : 'hidden'}`}>
      <div className='flex flex-col gap-2 rounded-lg border-[2px] border-dashed border-[#dbdbdbca] p-4 w-full h-full'>
        <div className='flex justify-between items-center gap-4'>
          <h2 className='font-semibold uppercase'>Quantia: {transaction.amount}</h2>
          <div className={`flex items-center justify-center py-1 px-4 rounded-full w-fit ${transaction.used ? 'bg-[#e277775a]' : 'bg-[#7784e25a]'}`}>
            <span className='text-[14px]'>{transaction.used ? "Usado" : "Válido"}</span>
          </div>
        </div>
        <h2>Estudante: {transaction.enrollmentId}</h2>
        <h2>Funcionário: {transaction.employeeId}</h2>
        <div className='flex items-center justify-between gap-2'>
          <h2>
            Número da transação:{" "}
            <span id={`${transaction?.id}NumeroDaTransacao`}>
              {transaction.transactionNumber}
            </span>
          </h2>
          <div className='w-full max-w-[24px] h-[24px]'>
            <CopySimple
              size={18}
              className='cursor-pointer'
              onClick={() =>
                UseCopier({ elementId: `${transaction?.id}NumeroDaTransacao` })
              }
            />
          </div>
        </div>

        <h2>Id do pagamento: {transaction?.paymentId ? transaction?.paymentId : '- - -'}</h2>
        <div className='flex justify-between w-full'>
          <h2 className='text-[14px]'>
            Data: {new Date(transaction.date).toLocaleDateString()}
          </h2>
          <h2 className='text-[14px]'>
            Hora: {new Date(transaction.date).toLocaleTimeString()}
          </h2>
        </div>
      </div>
    </div>
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
          <button
            type="button"
            className={`text-[12px] uppercase border py-2 px-4 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc] ${searchType === 'enrollmentId' ? 'border-[#dcdcdc]' : 'border-[#dcdcdc00]'}`}
            onClick={() => { setSearchType('enrollmentId'), setCurrentTransactionType('ALL') }}
          >
            Nº de inscrição
          </button>
          <button
            type="button"
            className={`text-[12px] uppercase border py-2 px-4 rounded-3xl  hover:bg-[#dcdcdc52] 
              ${searchType !== 'enrollmentId' ? 'border-[#dcdcdc]' : 'border-[#dcdcdc00]'}`}
            onClick={() => { setSearchType('transactionNumber'), setCurrentTransactionType('ALL') }}
          >
            Nº da transação
          </button>
        </div>
        <InputSearch
          placeholder={searchType === "enrollmentId" ? 'Insira o número de inscrição do aluno...' : 'Insira o número da transação...'}
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
          value={enrollmentId}
          onKeyDown={(e: any) => searchStudent(e)}
          onChange={(e: any) => setEnrollmentId(e.target.value)}
        />
      </div>
      {transactions && <div className="flex gap-4 flex-wrap">
        {
          TRANSACTION_VIEW_OPTIONS.map(({ id, content, transactionType }) => (
            <button
              key={id}
              type="button"
              className={`text-[14px] uppercase border py-2 px-4 rounded-3xl hover:bg-[#dcdcdc52] hover:border-[#dcdcdc] ${currentTransactionType === transactionType ? 'border-[#dcdcdc]' : 'border-[#dcdcdc00]'}
              ${searchType === 'transactionNumber' ? 'hidden' : 'flex'}
              `}
              onClick={() => setCurrentTransactionType(transactionType)}
            >
              {content} ( {transactionType === 'ALL' ? transactions?.transactions?.items?.length : transactionType === 'USED' ? transactionsUsed?.length : transactionsValid?.length} )
            </button>
          ))
        }
      </div>}

      {isLoading &&
        <h1 className="text-[24px] md:text-[32px] font-semibold w-full justify-center flex items-center h-[248px]">
          Buscando {searchType === 'enrollmentId' ? 'comprovativos...' : 'comprovativo...'}
        </h1>
      }
      {error &&
        <h1 className="text-[24px] md:text-[32px] font-semibold justify-center flex items-center h-[248px] w-full">
          Comprovativos não encontrados 😢
        </h1>
      }
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
        {
          transactions && !transactions?.transactions?.items ? RenderTransactionCard(transactions) : transactions?.transactions.items?.map(RenderTransactionCard)
        }
      </div>
    </div >
  )
}

export { BankProofsPage }
