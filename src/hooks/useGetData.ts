const UseGetData = (keyName: string) => {
  const storedData = localStorage.getItem(keyName)

  if (storedData) {
    try {
      const data = JSON.parse(storedData)
      return data
    } catch (error) {
      return null
    }
  }

  return null
}

export { UseGetData }
