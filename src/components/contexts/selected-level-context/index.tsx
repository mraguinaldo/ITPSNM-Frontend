import { createContext, type ReactNode, useState } from 'react'
import { LEVELS } from '../../grades/data'
import type { IEnrollmentNumber, ISelectedLevel, IUseContextType } from './interface'

const SelectedLevelContenxts = createContext<IUseContextType | undefined>(undefined)

const UseContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLevel, setSelectedLevel] = useState<ISelectedLevel>(LEVELS[0])
  const [enrollmentNumber, setEnrollmentNumber] = useState<IEnrollmentNumber>({ id: 1 })

  return (
    <SelectedLevelContenxts.Provider value={{ selectedLevel, setSelectedLevel, enrollmentNumber, setEnrollmentNumber }}>
      {children}
    </SelectedLevelContenxts.Provider>
  )
}

export { UseContextProvider, SelectedLevelContenxts }
