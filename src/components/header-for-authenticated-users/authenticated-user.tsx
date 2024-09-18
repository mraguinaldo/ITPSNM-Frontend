interface IAuthenticatedUser {
  fullName: string
  avatar: string
  studentType: 'Bolseiro' | 'Normal'
}

const AuthenticatedUser = ({ fullName, studentType, avatar }: IAuthenticatedUser) => {
  return (
    <div id="student" className="flex gap-4 w-full max-w-[400px] items-center justify-end cursor-pointer">
      <img
        src={avatar}
        alt={avatar}
        className="w-full max-w-[56px] h-[56px] rounded-full border-[3px] border-[#F8C40D]"
      />
      <div className="w-fit hidden flex-col md:flex">
        <h3 className="text-white font-semibold text-[16px] tracking-[2px]">{fullName}</h3>
        <span className="text-[14px] font-normal tracking-[2px] text-[#989292]">{studentType}</span>
      </div>
    </div>
  )
}

export { AuthenticatedUser }
