interface IHeaderContent {
  label: string
}
const HeaderContent = ({ label }: IHeaderContent) => {
  return (
    <th className="border-y border-gray-300 px-4 py-2 whitespace-nowrap font-medium">
      {label}
    </th>
  )
}

export { HeaderContent }