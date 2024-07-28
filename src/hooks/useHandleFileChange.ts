const UseHandleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  try {
    const { files } = e.target

    if (files && files.length > 0) {
      const file = files[0]
      return file
    }
  } catch (error) {
    console.log(error)
  }
}

export { UseHandleFileChange }
