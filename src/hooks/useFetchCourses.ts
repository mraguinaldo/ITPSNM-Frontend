import { useQuery } from 'react-query'
import { API } from '../services/api'

const UseFetchCourses = () => {
  const fetchCourses = async () => {
    try {
      const response = await API.get('/courses')
      if (response.data) {
        const { courses }: any = response.data
        return courses
      }
    } catch (err) {
      console.log('Erro ao buscar os cursos.', err)
    }
  }

  return useQuery({
    queryKey: ['Courses'],
    queryFn: fetchCourses,
  })
}

export { UseFetchCourses }
