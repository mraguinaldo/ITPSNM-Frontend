import { useQuery } from 'react-query'
import { API } from '../services/api'

const UseFetchCounties = () => {
  const fetchCounties = async () => {
    try {
      const response = await API.get('/counties')
      if (response.data) {
        const { counties }: any = response.data
        return counties
      }
    } catch (err) {
    }
  }

  return useQuery({
    queryKey: ['Counties'],
    queryFn: fetchCounties,
  })
}

export { UseFetchCounties }
