import { useMutation } from 'react-query'
import { API } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../components/toast'
import { UsestoreData } from './useStoreData'

const UseEnrollStudent = () => {
  const navigate = useNavigate()
  const nextForm = '/register/document-form'
  const errorMessage = 'Matrícula existente'

  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      UsestoreData('studentData', formData)
      const response = await API.post('/enrollments', formData)

      return response.data
    },
    onSuccess: () => {
      navigate(nextForm)
    },
    onError: () => {
      Toast({ message: errorMessage, theme: 'dark', toastType: 'error' })
    },
  })
}

export { UseEnrollStudent }
