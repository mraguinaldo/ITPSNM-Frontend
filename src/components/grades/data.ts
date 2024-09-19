const Table = {
  THEAD: [
    { id: 0, content: 'Disciplinas', visible: true, colSpan: 0 },
    { id: 1, content: 'Iº Trimestre', visible: true, colSpan: 5 },
    { id: 2, content: 'IIº Trimestre', visible: true, colSpan: 5 },
    { id: 3, content: 'IIIº Trimestre', visible: true, colSpan: 6 },
  ],
  TEST_TYPES: [
    { id: 0, testType: '0', visible: false },
    { id: 1, testType: 'P1', visible: true },
    { id: 2, testType: 'P2', visible: true },
    { id: 3, testType: 'PT', visible: true },
    { id: 4, testType: 'MT1', visible: true },
    { id: 5, testType: '0', visible: false },
    { id: 6, testType: 'P1', visible: true },
    { id: 7, testType: 'P2', visible: true },
    { id: 8, testType: 'PT', visible: true },
    { id: 9, testType: 'MT2', visible: true },
    { id: 10, testType: '0', visible: false },
    { id: 11, testType: 'P1', visible: true },
    { id: 12, testType: 'P2', visible: true },
    { id: 13, testType: 'PT', visible: true },
    { id: 14, testType: 'NEE', visible: true },
    { id: 15, testType: 'MF', visible: true },
    { id: 16, testType: 'MFD', visible: true },
  ],
}

const LEVELS = [
  {
    id: 0,
    level: '10ª Classe',
    ordinalFormClass: 'tenth_class',
  },
  {
    id: 1,
    level: '11ª Classe',
    ordinalFormClass: 'eleventh_class',
  },
  {
    id: 2,
    level: '12ª Classe',
    ordinalFormClass: 'twelfth_class',
  },
]

export { Table, LEVELS }
