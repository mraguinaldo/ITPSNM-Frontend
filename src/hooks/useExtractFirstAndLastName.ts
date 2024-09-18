const UseExtractFirstAndLastName = (fullName: string) => {
  const splitName = fullName.split(' ')
  const splitNameSize = splitName.length

  const firstName = splitName[0]
  const lastName = splitName[splitNameSize - 1]

  const nameExtracted = firstName.concat(' ', lastName)

  if (nameExtracted) return nameExtracted
}

export { UseExtractFirstAndLastName }
