import type { IAllProgress } from './interface'
import { Progress } from './progress'

const AllProgress = ({ firstProcess, secondProcess, thirdProcess }: IAllProgress) => {
  const ALL_PROGRESS = [
    {
      id: 0,
      typeProgress: firstProcess,
      value: 1,
    },
    {
      id: 1,
      typeProgress: secondProcess,
      value: 2,
    },
    {
      id: 2,
      typeProgress: thirdProcess,
      value: 3,
    },
  ]
  return (
    <div className="flex items-center w-full">
      {ALL_PROGRESS.map(({ id, value, typeProgress }) => (
        <Progress key={id} typeProgress={typeProgress} value={value} />
      ))}
    </div>
  )
}

export { AllProgress }
