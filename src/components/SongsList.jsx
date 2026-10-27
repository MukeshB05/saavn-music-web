import { usePlayer } from '../context.jsx'
import { artistsOf, img, mmss } from '../api.js'

export default function SongsList({ songs = [], onRemove }) {
  const { play, song: cur, isFav, toggleFav, addTo } = usePlayer()
  if (!songs.length) return <p className="muted">No songs.</p>
  return (
    <div className="songs">
      {songs.map((s, i) => (
        <div key={s.id} className={'row' + (cur?.id === s.id ? ' on' : '')}>
          <span onClick={() => play(songs, i)}>{i + 1}</span>
          <img src={img(s)} alt="" onClick={() => play(songs, i)} />
          <div className="grow" onClick={() => play(songs, i)}><b>{s.name}</b><small>{artistsOf(s)}</small></div>
          <small>{mmss(s.duration)}</small>
          <button onClick={() => toggleFav(s)}>{isFav(s) ? '❤' : '♡'}</button>
          <button title="Add to playlist" onClick={() => addTo(window.prompt('Add to playlist (name):'), s)}>＋</button>
          {onRemove && <button onClick={() => onRemove(s)}>✕</button>}
        </div>
      ))}
    </div>
  )
}
