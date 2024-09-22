import { CaretDown, DownloadSimple } from 'phosphor-react'
import { LEVELS } from './data'
import { UseDownloadFile } from '../../hooks/useDonwloadFile'
import { OptionsModal } from '../modals/options-modal'
import { SelectedArea } from '../selected-area'
import { useState } from 'react'
import type { IHeader } from './interfaces'

const Header = ({ details, user }: IHeader) => {
  const [modalState, setModalState] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[0].level)

  const toggleModalState = (selectedLevelId: number) => {
    setModalState((prev) => !prev)
    setSelectedLevel(LEVELS[selectedLevelId].level)
  }

  const donwloadFile = (elementId: string) => {
    UseDownloadFile({ elementId })
  }

  return (
    <header className="flex items-end justify-between flex-wrap gap-16">
      <div id="student" className="flex flex-col gap-4 w-[600px]">
        <h2 className="text-[24px] sm:text-[32px] font-semibold">{user?.userName}</h2>
        <ul id="details" className="flex w-full gap-4 flex-wrap">
          {details.map(({ id, detailType, content }) => (
            <li key={id} className="text-[14px] sm:text-[16px]">
              {detailType}
              <span className="text-[#737373] text-[14px] sm:text-[16px]">{content}</span>
            </li>
          ))}
        </ul>
        <div className="relative w-full max-w-[160px]">
          <button
            type="button"
            className="text-[#1E1E1E] w-full py-3 px-6 bg-[#F4F4F4] flex gap-2 rounded-[50px] items-center cursor-pointer text-[14px] sm:text-[16px] absolute z-50"
            onClick={() => setModalState((prev) => !prev)}
          >
            {selectedLevel}
            <CaretDown
              size={18}
              color="#2F2F2F"
              className={`duration-100 cursor-pointer ${modalState ? 'rotate-[-180deg]' : 'rotate-0'}`}
            />
          </button>
          <OptionsModal className="top-8" modalState={modalState}>
            {LEVELS.map(({ id, level }) => (
              <SelectedArea
                key={id}
                id={id}
                area={level}
                onClick={() => {
                  toggleModalState(id)
                }}
              />
            ))}
          </OptionsModal>
        </div>
      </div>
      <div id="download_grade_report" className="relative">
        <button
          type="button"
          className="text-[#1E1E1E] w-full justify-center sm:w-fit py-3 px-6 bg-[#F8C40D] flex gap-2 rounded-[50px] font-medium items-center cursor-pointer text-[14px] sm:text-[16px]"
          onClick={() => donwloadFile('grade_report')}
        >
          Baixar relatório de notas
          <DownloadSimple size={16} color="#1E1E1E" />
        </button>
      </div>
    </header>
  )
}

export { Header }
