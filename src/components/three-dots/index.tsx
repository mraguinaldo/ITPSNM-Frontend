import { Circle } from "phosphor-react"

const ThreeDots = () => {
  return (
    <div className='flex gap-1 w-full items-center justify-center h-dvh'>
      {Array.from({ length: 3 }, ((_, index: number) => (
        <Circle key={index} size={12} color='#343434' weight='duotone' className='animate-pulse duration-300' />
      )))}
    </div>
  )
}

export { ThreeDots }