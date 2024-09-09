const UseGetCurrentAcademicYear = () => {
  const data = new Date()

  const currentYear = data.getFullYear()
  const nextYear = currentYear + 1

  const currentAcademicYear = `${currentYear}/${nextYear}`
  return currentAcademicYear
}

export { UseGetCurrentAcademicYear }
