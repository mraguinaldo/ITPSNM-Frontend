import type { IAuthenticatedUser } from './interface'

const AuthenticatedUser = ({ fullName, studentType, avatar, onMouseEnter, onClick }: IAuthenticatedUser) => {
  return (
    <div id="student" className="flex gap-4 w-ful items-center justify-end">
      <img
        src={avatar}
        alt={avatar}
        className="w-full max-w-[56px] cursor-pointer h-[56px] rounded-full border-[3px] border-[#F8C40D]"
        onMouseEnter={onMouseEnter}
        onClick={onClick}
      />
      <div onMouseEnter={onMouseEnter} onClick={onClick} className="w-fit hidden flex-col md:flex cursor-pointer">
        <h3 className="text-white font-semibold text-[16px] tracking-[2px]">{fullName}</h3>
        <span className="text-[14px] font-normal tracking-[2px] text-[#989292]">{studentType}</span>
      </div>
    </div>
  )
}

export { AuthenticatedUser }
