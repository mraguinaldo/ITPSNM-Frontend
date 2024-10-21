import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseFetchStudentBankProof = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ searchType, enrollmentId }: { searchType: any, enrollmentId: any }) => {
      const validRoutes: any = {
        enrollmentId: `enrollments/${enrollmentId}/transactions`,
        transactionNumber: `transactions/${enrollmentId}`
      }
      
      if(searchType){
        const response = await API.get(validRoutes[searchType])

        return response.data
      }
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(['studentBankProof'], data)
    },
    onError:(error: any) => {
      if(error.response.data.message === 'No transactions found for this student.'){
        Toast({ message: 'Nenhuma transação encontrada para este estudante.', theme: 'colored', toastType: 'error' })
      }else if(error.response.data.message === 'Transaction not found.'){
        Toast({ message: 'Transação não encontrada...', theme: 'colored', toastType: 'error' })
      }else{
        Toast({ message: 'Erro buscar transações...', theme: 'colored', toastType: 'error' })
      }
    }
  })
}

export { UseFetchStudentBankProof }

