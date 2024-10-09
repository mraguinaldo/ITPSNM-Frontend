import type { IFinalAssessment } from './interfaces'

const FinalAssessment = ({ average }: IFinalAssessment) => {
  return (
    <div className="w-full max-w-[124px] relative">
      <span className="border-[1px] w-full absolute text-white border-b-[#D9D9D9] bg-[#000C13] text-[14px] sm:text-[16px] text-center font-bold p-2">
        Observação
      </span>

      <div className="w-full max-w-[124px] pt-10 px-3 h-full flex bg-[#F2F1F1] justify-center items-center">
        <h2
          className={`text-[14px] whitespace-nowrap uppercase font-semibold ${average === 'Reprovado' ? 'text-[#E70F0F]' : 'text-[#3757FF]'}`}
        >
          {average === 'Apto' ? 'Apto' : average === 'Reprovado' ? 'Reprovado' : 'Apto/Def'}
        </h2>
      </div>
    </div>
  )
}

export { FinalAssessment }
