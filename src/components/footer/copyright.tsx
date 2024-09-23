import { Link } from 'react-router-dom'

const Copyright = () => {
  return (
    <div className="w-full items-center justify-center">
      <p className="w-full text-center font-light text-[#989292]">
        Desenvolvido com muito ❤️ pela{' '}
        <Link to="/" className="font-semibold text-white">
          Octoplus.Developers
        </Link>
      </p>
    </div>
  )
}

export { Copyright }
