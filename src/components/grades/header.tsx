import { CaretDown, DownloadSimple } from 'phosphor-react'
import { STUDENT } from './data'
import { UseGetCurrentAcademicYear } from '../../hooks/useGetCurrentAcademicYear'
// import { DownloadGradeReportModal } from '../modals/download-grade-report'

const Header = () => {
  const currentAcademicYear = UseGetCurrentAcademicYear()
  const { details, name } = STUDENT

  return (
    <header className="flex items-end justify-between flex-wrap gap-7">
      <div id="student" className="flex flex-col gap-4">
        <h2 className="text-[24px] sm:text-[32px] font-semibold">{name}</h2>
        <ul id="details" className="flex gap-4 flex-wrap">
          {details.map(({ content, detailType, id }) => (
            <li key={id} className="text-[14px] sm:text-[16px]">
              {detailType}
              <span className="text-[#737373] text-[14px] sm:text-[16px]">{content}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="text-[#1E1E1E] w-fit py-3 px-6 bg-[#F4F4F4] flex gap-2 rounded-[50px] items-center cursor-pointer text-[14px] sm:text-[16px]"
        >
          {currentAcademicYear} <CaretDown size={16} color="#1E1E1E" />
        </button>
      </div>
      <div id="download_grade_report" className="relative">
        <button
          type="button"
          className="text-[#1E1E1E] w-full justify-center sm:w-fit py-3 px-6 bg-[#F8C40D] flex gap-2 rounded-[50px] font-medium items-center cursor-pointer text-[14px] sm:text-[16px]"
        >
          Baixar relatório de notas
          <DownloadSimple size={16} color="#1E1E1E" />
        </button>
        {/* <DownloadGradeReportModal /> */}
      </div>
    </header>
  )
}

export { Header }
