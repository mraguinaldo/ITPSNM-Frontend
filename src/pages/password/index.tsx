import { useQueryClient } from "react-query"
import { PasswordUpdateForm } from "../../components/reset-password"

const PasswordChangePage = () => {
  const queryClient = useQueryClient()
  const student: any = queryClient.getQueryData(['studentData'])

  return (
    <main className="w-full max-w-[1296px] m-auto px-6 flex items-center justify-center gap-4 py-40">
      <PasswordUpdateForm email={student?.enrollment?.students?.User?.email || ''} />
    </main>
  )
}

export { PasswordChangePage }
