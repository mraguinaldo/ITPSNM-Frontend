const Search_Types = [
  {
    id: 0,
    searchType: 'enrollmentNumber',
    value: 'Nº de inscrição',
  },
  {
    id: 1,
    searchType: 'identityCardNumber',
    value: 'Número do BI',
  },
]

const initialValues = {
  searchValue: '',
  isModalOpen: false,
  selectedSearchMode: Search_Types[0].value,
  currentSearchType: Search_Types[0].searchType,
}

export { Search_Types, initialValues }
