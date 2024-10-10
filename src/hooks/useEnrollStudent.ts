import { useMutation } from 'react-query'
import { API } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../components/toast'
import { UsestoreData } from './useStoreData'

const UseEnrollStudent = () => {
  const navigate = useNavigate()
  // const nextForm = '/formulario-de-documentos'
  const nextForm = '/pagina-de-felicitacao'

  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      UsestoreData('studentData', formData)
      const response = await API.post('/enrollments', formData)

      return response.data
    },
    onSuccess: () => {
      navigate(nextForm)
    },
    onError: (error: any) => {
      if (error.response.data.message === 'Student not found.') {
        Toast({ message: 'Inscrição não encontrada!', theme: 'dark', toastType: 'error' })
      }else if(error.response.data.message === 'Enrollment already exists error.'){
        Toast({ message: 'Já existe uma matrícula com esse número do BI', theme: 'dark', toastType: 'error' })
      }
    },
  })
}

export { UseEnrollStudent }
