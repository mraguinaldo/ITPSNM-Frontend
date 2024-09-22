import type { IHeadLine } from './interfaces'

const HeadLine = ({ colSpan, content, visible }: IHeadLine) => {
  return (
    <th
      colSpan={colSpan}
      className={`border-[1px] text-white border-b-[#D9D9D9] text-[14px] sm:text-[16px] text-center p-2 ${visible ? 'opacity-1' : 'opacity-0'}`}
    >
      {content}
    </th>
  )
}

export { HeadLine }
