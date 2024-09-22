import { createContext, type ReactNode, useState } from 'react'
import { LEVELS } from '../../grades/data'
import type { ISelectedLevel, IUseContextType } from './interface'

const SelectedLevelContenxts = createContext<IUseContextType | undefined>(undefined)

const UseContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLevel, setSelectedLevel] = useState<ISelectedLevel>(LEVELS[0])

  return (
    <SelectedLevelContenxts.Provider value={{ selectedLevel, setSelectedLevel }}>
      {children}
    </SelectedLevelContenxts.Provider>
  )
}

export { UseContextProvider, SelectedLevelContenxts }
