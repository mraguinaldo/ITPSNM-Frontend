// import Cookies from 'js-cookie'
// import { UseFetchUsers } from './useFetchUsers'
// import { UseFetchEnrollments } from './useFetchEnrollments'

// const UsePickUpAuthenticatedStudent = () => {
//   const role = Cookies.get('role')
//   const userId = Cookies.get('userId')

//   const { data: users, isLoading: isLoadingUsers }: any = UseFetchUsers(role || '')
//   const { data: enrollments, isLoading: isLoadingEnrollments }: any = UseFetchEnrollments()

//   if (!isLoadingUsers && users && !isLoadingEnrollments && enrollments) {
//     const userFound = users.users.items.find((user: any) => user.id.toString() === userId)

//     if (userFound) {
//       const studentFound = enrollments.items.find((enrollment: any) => enrollment.students.id === userFound.studentId)

//       return studentFound || null
//     }
//   }

//   return null
// }

// export { UsePickUpAuthenticatedStudent }
