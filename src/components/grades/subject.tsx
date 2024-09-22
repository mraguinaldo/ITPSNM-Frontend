import type { ISubject } from './interfaces'

const Subject = ({ subject }: ISubject) => {
  return (
    <td className="text-[#000] text-start pl-4 w-[240px] whitespace-nowrap text-ellipsis overflow-hidden border-[1px] text-[14px] sm:text-[16px] border-[#D9D9D9] p-2">
      {subject.length > 20 ? subject.slice(0, -5).concat('...') : subject}
    </td>
  )
}

export { Subject }
