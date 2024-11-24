import type { IAuthenticatedUser } from './interface'

const AuthenticatedUser = ({
  fullName,
  userType,
  avatar,
  onMouseEnter,
  onClick,
  className,
  avatarClassName,
}: IAuthenticatedUser) => {
  return (
    <div id="student" className={`flex items-center gap-4 w-ful ${className}`}>
      <img
        src={avatar}
        alt={avatar}
        className={`w-full max-w-[48px]  sm:max-w-[56px] cursor-pointer sm:h-[56px] h-[48px] rounded-full border-[3px] border-[#F8C40D] ${avatarClassName}`}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
      />
      <div
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        className="w-fit hidden flex-col md:flex cursor-pointer"
      >
        <h3 className="text-white font-semibold text-[16px] tracking-[2px]">
          {fullName}
        </h3>
        <span className="text-[14px] font-normal tracking-[2px] text-[#989292]">
          {userType
            .slice(0, 1)
            .toUpperCase()
            .concat(
              userType.slice(1)
                .toLocaleLowerCase()
            )
          }
        </span>
      </div>
    </div>
  )
}

export { AuthenticatedUser }
