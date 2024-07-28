interface IAllProgress {
  firstProcess: 'concluded' | 'inProgress' | 'stopped'
  secondProcess: 'concluded' | 'inProgress' | 'stopped'
  thirdProcess: 'concluded' | 'inProgress' | 'stopped'
}

interface IProgress {
  typeProgress: string
  value: number
}

export type { IAllProgress, IProgress }
