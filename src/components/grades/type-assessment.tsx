import type { ITypeAssessment } from './interfaces'

const TypeAssessment = ({ typeAssessment, visible, id }: ITypeAssessment) => {
  return (
    <th
      key={id}
      className={`border-[1px] border-b-[#D9D9D9] text-[14px] sm:text-[16px] text-center p-2 ${visible ? 'opacity-1' : 'opacity-0'}`}
    >
      {typeAssessment}
    </th>
  )
}

export { TypeAssessment }
