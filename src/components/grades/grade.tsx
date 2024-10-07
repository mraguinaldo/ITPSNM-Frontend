import type { IGrade } from './interfaces'

const Grade = ({ grade, visible }: IGrade) => {
  return (
    <td
      className={`border-[1px] text-[14px] sm:text-[16px] border-[#D9D9D9] w-[40px] text-center py-2 px-1 ${grade < 10 ? 'text-[#E70F0F]' : 'text-[#3757FF]'} ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {grade ? grade : grade === 0 ? grade : '---'}
    </td>
  )
}

export { Grade }
