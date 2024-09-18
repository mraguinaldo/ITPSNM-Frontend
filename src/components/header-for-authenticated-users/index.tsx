import { useEffect, useState } from 'react'
import { UseExtractFirstAndLastName } from '../../hooks/useExtractFirstAndLastName'
import { AuthenticatedUser } from './authenticated-user'
import { Logo } from '../logo'

const HeaderForAuthenticatedUsers = () => {
  const [fullName, setFullName] = useState<string>('')
  useEffect(() => {
    const nameExtracted = UseExtractFirstAndLastName('Agostinho Mafuco César Cambriz')

    if (nameExtracted) {
      setFullName(nameExtracted)
    }
  }, [])
  return (
    <header className="w-full fixed z-[100] bg-[#000C13] border-b border-[#f0f0f0]">
      <div className="w-full max-w-[1296px] m-auto px-6 flex items-center justify-between h-[78px]">
        <Logo />
        <AuthenticatedUser fullName={fullName} studentType="Bolseiro" avatar="/men-00.png" />
      </div>
    </header>
  )
}

export { HeaderForAuthenticatedUsers }
