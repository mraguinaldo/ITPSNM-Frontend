interface IHeaderContent {
  colSpan: number,
  content: string,
  itemLeft: boolean
}

const HeaderContent = ({ colSpan, content, itemLeft }: IHeaderContent) => {
  return (
    <th
      colSpan={colSpan}
      className={`w-auto p-3 font-medium text-[14px] uppercase text-[#363636] whitespace-nowrap overflow-x-hidden ${itemLeft ? 'text-left' : 'text-center'}`}
    >
      {content}
    </th>
  )
}

export { HeaderContent }