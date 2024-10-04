const UseGettMaritalStatus = (status: string, gender: string) => {
  const maritalStatusMap: any = {
    SINGLE: gender === 'MALE' ? 'Solteiro' : 'Solteira',
    MARRIED: gender === 'MALE' ? 'Casado' : 'Casada',
    DIVORCED: gender === 'MALE' ? 'Divorciado' : 'Divorciada',
    WIDOWED: gender === 'MALE' ? 'Viúvo' : 'Viúva',
  }
  return maritalStatusMap[status] || ''
}

export { UseGettMaritalStatus }
