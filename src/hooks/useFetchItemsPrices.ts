import { useQuery } from 'react-query'
import { API } from '../services/api'

const UseFetchItemsPrices = () => {
  const fetchItemsPrices = async () => {
    try {
      const response = await API.get('/item-prices')

      return response.data
    } catch (err) {
    }
  }

  return useQuery({
    queryKey: ['itemsPrices'],
    queryFn: fetchItemsPrices,
  })
}

export { UseFetchItemsPrices }
