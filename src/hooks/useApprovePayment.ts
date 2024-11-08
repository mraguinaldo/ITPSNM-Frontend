import { useMutation, useQueryClient } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseApprovePayment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ paymentId, employeeId }: { paymentId: any, employeeId: any }) => {
      const response = await API.post(`/payments/approve`, {paymentId, employeeId})

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['studentData'])
      Toast({
        message: 'Pagamento aprovado',
        theme: 'colored',
        toastType: 'success',
      })
    },
    onError: (error: any) => {
     
       if(error.response.data.message === 'Insufficient funds.'){
        Toast({ 
          message: 'Saldo insuficiente', 
          theme: 'colored', 
          toastType: 'error' 
        })}else{
          Toast({
            message: 'Erro ao aprovar o pagamento',
            theme: 'colored',
            toastType: 'error',
          })
        }
    },
  })
}

export { UseApprovePayment }
