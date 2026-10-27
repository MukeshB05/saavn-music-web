import { NavLink } from 'react-router-dom'

// Home, Search, Create, Library, Spotify (sidebar on desktop, bottom bar on mobile)
const links = [['/', '🏠', 'Home'], ['/search', '🔍', 'Search'], ['/create', '＋', 'Create'], ['/library', '📚', 'Library'], ['/spotify-import', '⬇', 'Spotify']]
export default function Navigator() {
  return (
    <nav className="navigator">
      {links.map(([to, i, label]) => <NavLink key={to} to={to} end><span>{i}</span>{label}</NavLink>)}
    </nav>
  )
}
