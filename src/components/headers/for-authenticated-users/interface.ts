interface IAuthenticatedUser {
  fullName: string
  avatar: string
  studentType: string
  onMouseEnter: () => void
  onClick: () => void
}

export type { IAuthenticatedUser }
