import type { IQuestionModal } from './interface'

const QuestionModal = ({ visible, confirm, iconConfirm, iconReject, reject, title, paragraph }: IQuestionModal) => {
  return (
    <div
      className={`fixed w-full h-screen flex justify-center left-0 items-center top-0 duration-300 z-[2000] ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="absolute inset-0 w-full h-screen bg-black opacity-60 z-10" onClick={reject}>
        {''}
      </div>

      <div
        className={`bg-[#1A1C1D] w-full max-w-[426px] z-20 flex flex-col px-6 py-4 justify-center items-center gap-4 rounded-xl ${visible ? 'animate-fadeOut' : 'animate-fadeIn'}`}
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-[18px] lg:text-[20px] leading-9 text-white text-center">{title}</h2>
          <h2 className="text-[14px] lg:text-[16px] text-[#969696] text-center">{paragraph}</h2>
        </div>

        <div className="flex justify-center items-center gap-3 w-full">
          <button
            type="button"
            className="bg-transparent border border-[#646464] w-full max-w-[44px] h-[40px] rounded-lg flex justify-center items-center transition-all hover:brightness-75"
            onClick={confirm}
          >
            {iconConfirm}
          </button>
          <button
            type="button"
            className="bg-transparent border border-[#646464] w-full max-w-[44px] h-[40px] rounded-lg flex justify-center items-center transition-all hover:brightness-75"
            onClick={reject}
          >
            {iconReject}
          </button>
        </div>
      </div>
    </div>
  )
}

export { QuestionModal }
