import { IHeaderContent } from "./interface"

const HeaderContent = ({ content }: IHeaderContent) => {
  return (
    <th className="w-auto p-3 text-left text-[14px] lg:text-[16px] font-normal text-[#363636]">
      {content}
    </th>
  )
}

export { HeaderContent }