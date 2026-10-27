import { usePlayer } from '../context.jsx'
import SongsList from '../components/SongsList.jsx'

export default function Favourite() {
  const { favs } = usePlayer()
  return <><h2>❤ Favourites</h2><SongsList songs={favs} /></>
}
