import { createContext, type ReactNode, useState } from 'react'
import { LEVELS } from '../../grades/data'
import type { IEnrollmentNumber, ISelectedLevel, IUseContextType } from './interface'

const ApplicationContexts = createContext<IUseContextType | undefined>(undefined)

const UseContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLevel, setSelectedLevel] = useState<ISelectedLevel>(LEVELS[0])
  const [enrollmentNumber, setEnrollmentNumber] = useState<IEnrollmentNumber>({ id: 7 })
  const [identityCardNumber, setIdentityCardNumber] = useState<IEnrollmentNumber>({})
  const [studentFound, setStudentFound] = useState<any>()
  const [enrollmentFound, setEnrollmentFound] = useState<any>()

  return (
    <ApplicationContexts.Provider
      value={{
        selectedLevel,
        setSelectedLevel,
        enrollmentNumber,
        setEnrollmentNumber,
        setStudentFound,
        studentFound,
        identityCardNumber,
        setIdentityCardNumber,
        enrollmentFound,
        setEnrollmentFound,
      }}
    >
      {children}
    </ApplicationContexts.Provider>
  )
}

export { UseContextProvider, ApplicationContexts }
