import { useQuery } from 'react-query'
import { API } from '../services/api'

const UseFetchProvinces = () => {
  const fetchProvinces = async () => {
    try {
      const response = await API.get('/provinces')
      if (response.data) {
        const { provinces }: any = response.data
        return provinces
      }
    } catch (err) {
    }
  }

  return useQuery({
    queryKey: ['Provinces'],
    queryFn: fetchProvinces,
  })
}

export { UseFetchProvinces }
