import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/characters'>All characters</Link>
        </li>
        <li>
          <Link to='/characters/new'>Create a new character</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
