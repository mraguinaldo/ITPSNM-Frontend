import type { ReactNode } from 'react'

interface PropsType {
  children: ReactNode
  className: string
  onClick?: () => void
}

const Root = ({ children, className, onClick }: PropsType) => {
  return (
    <tr
      className={`border-b border-[#E8E8E8] ${className} relative cursor-pointer hover:bg-[#ebebeb38]`}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export { Root }
