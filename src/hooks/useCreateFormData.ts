const UseCreateFormData = (data: any, enrollmentId: any, fieldPrefix: string) => {
  const formData: any = {}

  if (data.p1 >= 0) {
    formData[`${fieldPrefix}1`] = data.p1
  }

  if (data.p2 >= 0) {
    formData[`${fieldPrefix}2`] = data.p2
  }

  if (data.pt >= 0) {
    formData[`${fieldPrefix}t`] = data.pt
  }

  formData.enrollmentId = enrollmentId
  formData.subjectId = data.subjectId
  formData.level = data.level

  return formData
}

export { UseCreateFormData }
