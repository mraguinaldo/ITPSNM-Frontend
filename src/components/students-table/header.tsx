import { useState } from 'react'

import { InputSearch } from '../input-search'
import { MagnifyingGlass } from 'phosphor-react'

interface PropsTypes {
  totalStudents: number
}

const DataTableHeader = ({ totalStudents }: PropsTypes) => {
  const [currentTarget, setCurrentTarget] = useState<any>()

  return (
    <header className="flex flex-col items-start justify-between gap-8 sm:flex-row">
      <div id="about__contacts" className="flex flex-col gap-3">
        <h1 className="text-[32px] font-semibold leading-9">Total alunos ({totalStudents})</h1>
        <p className="text-base font-normal leading-5 text-[#737373]">Encontre os alunos!</p>
      </div>

      <div id="search__area" className="flex items-start gap-4 w-full sm:max-w-[216px]">
        <InputSearch
          placeholder="Pesquisar alunos..."
          icon={<MagnifyingGlass color="#737373" size={16} />}
          onChange={(e: any) => {
            setCurrentTarget(e.currentTarget.value)
          }}
        />
      </div>
    </header>
  )
}

export { DataTableHeader }
