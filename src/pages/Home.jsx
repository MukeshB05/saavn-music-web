import { usePlayer } from '../context.jsx'
import SongSlider from '../components/SongSlider.jsx'
import AlbumSlider from '../components/AlbumSlider.jsx'
import PlaylistSlider from '../components/PlaylistSlider.jsx'
import ArtistStations from '../components/ArtistStations.jsx'

const cap = (s) => s[0].toUpperCase() + s.slice(1)
export default function Home() {
  const { history, langs } = usePlayer()
  return (
    <>
      {history.length > 0 && <SongSlider title="Recently Played" songs={history.slice(0, 15)} />}
      <SongSlider title="Trending Now" query={`trending ${langs.join(' ')}`} />
      {langs.map((l) => <AlbumSlider key={'n' + l} title={`New Releases - ${cap(l)}`} path={`/search/albums?query=new releases ${l}&limit=20`} />)}
      <ArtistStations />
      {langs.map((l) => <PlaylistSlider key={'f' + l} title={`Fresh Hits - ${cap(l)}`} path={`/search/playlists?query=fresh hits ${l}&limit=20`} />)}
      <PlaylistSlider title="Best Of 90s" path={`/search/playlists?query=best of 90s ${langs[0]}&limit=20`} />
    </>
  )
}
