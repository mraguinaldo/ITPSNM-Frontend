import { useQueryClient } from "react-query"
import { PasswordUpdateForm } from "../../components/reset-password"

const PasswordChangePage = () => {
  const queryClient = useQueryClient()
  const student: any = queryClient.getQueryData(['studentData'])

  return (
    <main className="w-full max-w-[1296px] m-auto px-6 flex items-center justify-center gap-4 py-40">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <h2 className="text-[24px] font-medium">Redefinir Palavra-passe</h2>
        <PasswordUpdateForm email={student?.enrollment?.students?.User?.email || ''} />
      </div>
    </main>
  )
}

export { PasswordChangePage }
