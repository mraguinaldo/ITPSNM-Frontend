import type { IProgress } from './interface'

const Progress = ({ typeProgress, value }: IProgress) => {
  return (
    <div className={`w-full flex items-center ${value === 3 ? 'max-w-[24px]' : 'max-w-[688px]'}`}>
      <li
        className={`list-none rounded-full h-[24px] w-full max-w-[24px] flex items-center justify-center font-medium text-[14px] ${typeProgress === 'concluded' || typeProgress === 'inProgress' ? 'bg-[#F8C40D] ' : 'bg-[#F2F1F1]'}`}
      >
        {value}
      </li>
      {value !== 3 && (
        <li
          className={`list-none w-full max-w-[688px] h-[8px] ${typeProgress === 'concluded' ? 'bg-[#F8C40D] ' : 'bg-[#F2F1F1]'}`}
        />
      )}
    </div>
  )
}

export { Progress }
