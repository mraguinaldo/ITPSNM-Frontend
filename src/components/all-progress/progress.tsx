import type { IProgress } from './interface'

const Progress = ({ typeProgress, value, content }: IProgress) => {
  return (
    <div className={`flex flex-col gap-3 ${value !== 3 ? 'w-full' : 'w-fit'}`}>
      <div className={`w-full flex gap-2 md:gap-5 items-center ${value === 3 ? 'max-w-[40px]' : 'max-w-[688px]'}`}>
        <li
          className={`list-none rounded-full h-[40px] w-full max-w-[40px] flex items-center justify-center font-bold text-[14px] ${typeProgress === 'concluded' || typeProgress === 'inProgress' ? 'bg-[#F8C40D] ' : 'bg-[#F2F1F1]'}`}
        >
          {value}
        </li>
        {value !== 3 && (
          <li
            className={`list-none w-full max-w-[688px] rounded-full h-[12px] ${typeProgress === 'concluded' ? 'bg-[#F8C40D] ' : 'bg-[#F2F1F1]'}`}
          />
        )}
      </div>

      <div className="w-full ">
        <p
          className={`font-semibold text-[14px] md:text-[16xp] text-ellipsis overflow-hidden whitespace-nowrap w-full ${value === 3 && 'md:pr-9 pr-4'}`}
        >
          {content}
        </p>
        <span
          className={`font-semibold text-[14px] md:text-[16px] w-full ${typeProgress === 'concluded' ? 'text-[#00AA1F]' : 'text-[#9F9F9F]'}`}
        >
          {typeProgress === 'concluded' ? 'Feito' : typeProgress === 'inProgress' ? 'Em andamento' : 'Pendente'}
        </span>
      </div>
    </div>
  )
}

export { Progress }
