import { usePlayer } from '../context.jsx'
import { artistsOf, img } from '../api.js'

export default function SongGrid({ songs = [] }) {
  const { play } = usePlayer()
  return (
    <div className="grid">
      {songs.map((s, i) => (
        <div key={s.id} className="card" onClick={() => play(songs, i)}>
          <img src={img(s)} alt="" /><b>{s.name}</b><small>{artistsOf(s)}</small>
        </div>
      ))}
    </div>
  )
}
