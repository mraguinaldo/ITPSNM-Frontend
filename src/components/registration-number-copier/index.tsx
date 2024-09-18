import { useRef } from 'react'

import { Button } from '../button'
import type { IRegistrationNumberCopier } from './interface'
import { Toast } from '../toast'

const RegistrationNumberCopier = ({ content }: IRegistrationNumberCopier) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleRegistrationNumberCopy = () => {
    const copiedNumber = inputRef.current?.value

    if (copiedNumber) {
      navigator.clipboard
        .writeText(copiedNumber)
        .then(() => {
          Toast({ message: 'Número de inscrição copiado', theme: 'light' })
        })
        .catch(() => {
          Toast({ message: 'Error ao copiar o número de inscrição', theme: 'dark', toastType: 'error' })
        })
    }
  }
  return (
    <div className="flex w-full max-w-[683px] flex-row items-center justify-center gap-3 rounded-[8px] bg-[#F8F8F8] px-4 py-3">
      <input
        ref={inputRef}
        id="registrationNumber"
        defaultValue={content}
        disabled
        className="w-full max-w-[445px] rounded-[8px] border-none bg-transparent p-4 text-[14px] lg:text-[18px] font-semibold leading-[130%] text-[#000] outline-none"
      />
      <div className="flex w-full items-center justify-center sm:max-w-[150px]">
        <Button
          type="button"
          content="Copiar"
          onClick={() => handleRegistrationNumberCopy()}
          className="w-full bg-[#F8C40D] max-w-[445px] py-4 leading-[130%] tracking-[0px] sm:max-w-[150px] sm:px-2"
        />
      </div>
    </div>
  )
}

export { RegistrationNumberCopier }
