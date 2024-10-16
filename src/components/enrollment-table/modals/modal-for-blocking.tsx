import { X } from 'phosphor-react'
import { Button } from '../../button'
import { useEffect, useState } from 'react'

interface IModalForBlocking {
  modalStateForBlocking: boolean
  identityCardNumber: string
  onClick: () => void
  closeModal: () => void
}

const ModalForBlocking = ({ modalStateForBlocking, onClick, identityCardNumber, closeModal }: IModalForBlocking) => {
  const [reasonForBlocking, setReasonForBlocking] = useState<string>('')

  const blockStudent = (e: any) => {
    e.preventDefault()
    alert(`${reasonForBlocking}, ${identityCardNumber}`)
    setReasonForBlocking('')
    closeModal()
  }

  useEffect(() => {
    !modalStateForBlocking && setReasonForBlocking('')
  }, [modalStateForBlocking])

  return (
    <div
      className={`fixed w-full z-50 left-0 h-screen flex justify-center items-center top-0 duration-300 px-6 ${modalStateForBlocking ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="absolute inset-0 w-full h-screen bg-black opacity-85 z-10" onClick={onClick}>
        {''}
      </div>

      <div className="w-full max-w-[424px] relative z-20 bg-white p-6 rounded-[8px]">
        <button
          type="button"
          id="close"
          className="absolute top-[-38px] right-0 rounded-full p-2 bg-[#000C13]"
          onClick={onClick}
        >
          <X color="#fff" size={16} />
        </button>
        <form action="" className="w-full flex flex-col gap-3" onSubmit={(e) => blockStudent(e)}>
          <textarea
            name="text_area"
            id=""
            className="w-full h-[92px] outline-none border-none"
            placeholder="Escreva o motivo para o bloqueio..."
            value={reasonForBlocking}
            onChange={(e) => setReasonForBlocking(e.currentTarget.value)}
          />
          <Button isLoading={false} type="submit" content="Bloquear" className="py-4 bg-[#000C13] text-white" />
        </form>
      </div>
    </div>
  )
}

export { ModalForBlocking }
