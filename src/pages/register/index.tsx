import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/footer'
import { Header } from '../../components/headers/normal'

const Register = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export { Register }
