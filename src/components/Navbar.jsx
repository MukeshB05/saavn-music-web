import { Link } from 'react-router-dom'
import { usePlayer } from '../context.jsx'

export default function Navbar({ onLang }) {
  const { langs } = usePlayer()
  return (
    <header className="navbar">
      <Link to="/" className="logo">♫ Saavn</Link>
      <span className="grow" />
      <button onClick={onLang}>Languages: {langs.map((l) => l[0].toUpperCase() + l.slice(1)).join(', ')} ▾</button>
      <Link to="/settings"><button>⚙</button></Link>
    </header>
  )
}
