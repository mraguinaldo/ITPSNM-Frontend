interface ITableRow {
  content: string
}
const TableRow = ({ content }: ITableRow) => {
  return (
    <td className="border-y border-gray-300 px-4 py-2 text-center whitespace-nowrap">
      {content}
    </td>
  )
}

export { TableRow }