import { CircleNotch } from 'phosphor-react'

const ProgressBar = () => {
  return (
    <div className="fixed top-0 h-screen left-0 bg-[#000000b6] z-[2000] w-full flex justify-center items-center">
      <CircleNotch size={88} color="#F8C40D" className="animate-rotate" />
    </div>
  )
}

export { ProgressBar }
