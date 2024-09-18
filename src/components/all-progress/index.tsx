import type { IAllProgress } from './interface'
import { Progress } from './progress'

const AllProgress = ({ firstProcess, secondProcess, thirdProcess }: IAllProgress) => {
  const ALL_PROGRESS = [
    {
      id: 0,
      typeProgress: firstProcess,
      value: 1,
      content: 'Dados Pessoais',
    },
    {
      id: 1,
      typeProgress: secondProcess,
      value: 2,
      content: 'Matrícula',
    },
    {
      id: 2,
      typeProgress: thirdProcess,
      value: 3,
      content: 'Documentos',
    },
  ]
  return (
    <div className="flex items-center justify-between gap-3 md:gap-5 w-full">
      {ALL_PROGRESS.map(({ id, value, typeProgress, content }) => (
        <Progress key={id} typeProgress={typeProgress} value={value} content={content} />
      ))}
    </div>
  )
}

export { AllProgress }
