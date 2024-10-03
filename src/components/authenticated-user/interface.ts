interface IAuthenticatedUser {
  fullName?: string
  avatar: string
  userType: string
  className?: string
  avatarClassName?: string
  onMouseEnter?: () => void
  onClick?: () => void
}

export type { IAuthenticatedUser }
