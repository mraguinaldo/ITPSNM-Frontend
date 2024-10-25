import { useQuery } from 'react-query'
import { API } from '../services/api'

const UseFetchSubjects = () => {
  const fetchSubjects = async () => {
    try {
      const response = await API.get('/subjects')
      if (response.data) {
        const { subjects }: any = response.data
        return subjects
      }
    } catch (err) {
    }
  }

  return useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  })
}

export { UseFetchSubjects }
