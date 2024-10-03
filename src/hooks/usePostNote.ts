import { useMutation } from 'react-query'
import { API } from '../services/api'

const UsePostNote = () => {
  return useMutation({
    mutationFn: async ({ formData }: { formData: any }) => {
      console.log(formData)
      const response = await API.post('/notes', formData)

      return response.data
    },
    onSuccess: () => {},
    onError: () => {},
  })
}

export { UsePostNote }
