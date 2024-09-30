import { Signup } from '../signup'

const UsersTable = () => {
  return (
    <div className="w-full px-8 py-16 lg:p-11 lg:rounded-[16px] bg-white h-dvh">
      <h1 className="text-[24px] font-semibold">Criar usuário</h1>
      <Signup />
    </div>
  )
}

export { UsersTable }
