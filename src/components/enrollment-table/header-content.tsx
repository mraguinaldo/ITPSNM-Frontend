interface IHeaderContent {
  content: string,
}

const HeaderContent = ({ content }: IHeaderContent) => {
  return (
    <th
      className={`w-auto p-3 whitespace-nowrap text-[14px] lg:text-[16px] font-normal text-[#363636] ${content === 'Estado da matrícula' ? 'text-left' : 'text-left '}`}
    >
      {content}
    </th>
  )
}

export { HeaderContent }