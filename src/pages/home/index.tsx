import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <section>
      <div>
        <h1>Você está na home</h1>
        <Link to="/register/bi-data-form" className="text-blue-800">
          Ir para a página de cadastro
        </Link>
      </div>
    </section>
  )
}

export { Home }
