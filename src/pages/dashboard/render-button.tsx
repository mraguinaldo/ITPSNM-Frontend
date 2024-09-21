import { Question, SignOut } from 'phosphor-react'
import { Link } from 'react-router-dom'

interface IRenderButtons {
  signOut: () => void
}

const RenderButtons = ({ signOut }: IRenderButtons) => {
  return (
    <div className="flex flex-col w-full gap-6 pb-12">
      <button
        type="button"
        onClick={signOut}
        className="text-white duration-150 rounded-lg cursor-pointer font-medium flex gap-4 px-6 py-4 hover:bg-[#312f2f6f]"
      >
        <SignOut size={24} color="#fff" />
        Terminar sessão
      </button>
      <Link to="/" className="text-white cursor-pointer flex gap-4 py-4 px-6 bg-[#312F2F] rounded-lg">
        <Question size={24} color="#F8C40D" />
        <p className="flex flex-col gap-2">
          Precisa de ajuda <span className="opacity-40">Contactar</span>
        </p>
      </Link>
    </div>
  )
}

export { RenderButtons }
