interface IField {
  field: string,
  value: string
}

const Field = ({ field, value }: IField) => {
  return (
    <h2 className='uppercase text-[14px] border-b pb-2'>{field ? `${field}:` : `${field}`} {value}</h2>
  )
}


export { Field }