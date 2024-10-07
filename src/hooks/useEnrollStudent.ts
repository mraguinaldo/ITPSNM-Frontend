import { useMutation } from 'react-query'
import { API } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Toast } from '../components/toast'
import { UsestoreData } from './useStoreData'
import Cookies from 'js-cookie'

const UseEnrollStudent = () => {
  const navigate = useNavigate()
  const nextForm = '/formulario-de-documentos'
  const errorMessage = 'Matrícula existente'
  const token = Cookies.get('token')

  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      UsestoreData('studentData', formData)
      const response = await API.post('/enrollments', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

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
