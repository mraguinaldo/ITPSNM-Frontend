import type { IProperty } from './interfaces'

const Property = ({ property }: IProperty) => {
  return (
    <td className="text-[#000] text-start whitespace-nowrap text-ellipsis overflow-hidden border-[1px] text-[14px] sm:text-[16px] border-[#D9D9D9] py-2 px-6">
      {property}
    </td>
  )
}

export { Property }
