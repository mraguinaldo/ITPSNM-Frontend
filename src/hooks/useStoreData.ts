const UsestoreData = (keyName: string, data: any) => {
  localStorage.setItem(keyName, JSON.stringify(data))
}

export { UsestoreData }
