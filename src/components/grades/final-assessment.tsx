import type { IFinalAssessment } from './interfaces'

const FinalAssessment = ({ average }: IFinalAssessment) => {
  return (
    <div className="w-full max-w-[124px] relative">
      <span className="border-[1px] w-full absolute text-white border-b-[#D9D9D9] bg-[#000C13] text-[14px] sm:text-[16px] text-center font-bold p-2">
        Resultado
      </span>

      <div className="w-full max-w-[124px] px-3 h-full flex bg-[#F2F1F1] justify-center items-center">
        <h2
          className={`text-[14px] md:text-[16px] uppercase font-semibold ${average < 10 ? 'text-[#E70F0F]' : 'text-[#3757FF]'}`}
        >
          {average < 10 ? 'Reprovado' : 'Aprovado'}
        </h2>
      </div>
    </div>
  )
}

export { FinalAssessment }
