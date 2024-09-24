const UsestoreData = (keyName: string, data: any) => {
  // const fields: { [key: string]: any } = {}
  // data.forEach((value: any, key: string) => {
  //   fields[key] = value
  // })
  localStorage.setItem(keyName, JSON.stringify(data))
}

export { UsestoreData }
