import { useMutation } from 'react-query'
import { API } from '../services/api'
import { Toast } from '../components/toast'

const UseRegisterInvoice = () => {
  return useMutation({
    mutationFn: async ({formData}: {formData: any}) => {
      const response = await API.post('/invoices', formData)

      return response.data
    },
    onSuccess: ()=>{
      Toast({ message: 'Fatura cadastrada com sucesso', theme: 'light', toastType: 'success' })
    },
    onError: (error: any)=> {
      if(error.response.data.message === 'Enrollment not found.'){
        Toast({ message: 'Estudante não encontrado', theme: 'colored', toastType: 'error' })
      }if(error.response.data.message.includes('already exists for the academic year')){
        const monthsMap: { [key: string]: string } = {
          'JANUARY': 'JANEIRO',
          'FEBRUARY': 'FEVEREIRO',
          'MARCH': 'MARÇO',
          'APRIL': 'ABRIL',
          'MAY': 'MAIO',
          'JUNE': 'JUNHO',
          'JULY': 'JULHO',
          'AUGUST': 'AGOSTO',
          'SEPTEMBER': 'SETEMBRO',
          'OCTOBER': 'OUTUBRO',
          'NOVEMBER': 'NOVEMBRO',
          'DECEMBER': 'DEZEMBRO'
        };

        const paidMonths = Object.keys(monthsMap).filter(month => error.response.data.message.includes(month));

        const paidMonthsInPortuguese = paidMonths.map(month => monthsMap[month]);

        console.log(paidMonths)

        const paidMonthsMessage = paidMonthsInPortuguese.length > 0 
        ? `O mês de ${paidMonthsInPortuguese.join(' - ')} já foi pago neste ano acadêmico:`
        : '';

        Toast({
          message: paidMonthsMessage,
          theme: 'colored',
          toastType: 'error'
        });


      }else{
        Toast({ message: 'Erro ao cadastrar a fatura', theme: 'colored', toastType: 'error' })
      }
    }
  })
}

export { UseRegisterInvoice }
