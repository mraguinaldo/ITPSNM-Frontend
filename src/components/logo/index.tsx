import { Link } from 'react-router-dom'
import { UsestoreData } from '../../hooks/useStoreData'

const Logo = () => {
  return (
    <Link to="/" onClick={() => UsestoreData('menuItemActive', 1)}>
      <img src="/Logo.png" alt="logo" />
    </Link>
  )
}

export { Logo }
