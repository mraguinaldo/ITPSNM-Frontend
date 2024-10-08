import type { IPaginator } from './interface'

const Paginator = ({ onClick, length, currentPage }: IPaginator) => {
  return (
    <div className="flex gap-2 flex-wrap w-full">
      {Array.from({ length }, (_, index: number) => (
        <button
          type="button"
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          onClick={onClick}
          className={`rounded-lg px-4 py-2 flex items-center justify-center ${currentPage === index + 1 ? 'bg-[#d8a429a9] font-semibold' : 'bg-[#b7b7b73b]'}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export { Paginator }
