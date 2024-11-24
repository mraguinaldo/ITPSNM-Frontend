import { IConfirmationDetailsViewer } from "./interface"

const ConfirmationDetailsViewer = (
  { classRoom,
    fullName,
    level,
    period
  }: IConfirmationDetailsViewer) => {
  return (
    <div className='flex gap-4 flex-col p-4'>
      <p className='font-medium'>Estudante: {fullName}</p>
      <div className='flex gap-4 flex-wrap'>
        <span className='border-b'>Turma: {level}</span>
        <span className='border-b'>{classRoom}</span>
        <span className='border-b'>Periodo: {period === 'AFTERNOON' ? 'Tarde' : period === 'MORNING' ? 'Manhã' : 'Noite'}</span>
      </div>
    </div>
  )
}

export { ConfirmationDetailsViewer }