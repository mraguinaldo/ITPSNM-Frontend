const UseformatDate = (dateString: string | Date) => {
  if (dateString) {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const currentdateFormatted = `${day}-${month}-${year}`

    return currentdateFormatted
  }

  return null
}

export { UseformatDate }
