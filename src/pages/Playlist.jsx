import { usePlayer } from '../context.jsx'
import SongsList from '../components/SongsList.jsx'

// Your own playlists (saved in this browser). Add songs with the ＋ button anywhere.
export default function Playlist() {
  const { lists, play, removeFrom, deleteList } = usePlayer()
  const names = Object.keys(lists)
  if (!names.length) return <><h2>🎶 My playlists</h2><p className="muted">Nothing yet. Press ＋ on any song to create one.</p></>
  return (
    <>
      <h2>🎶 My playlists</h2>
      {names.map((n) => (
        <section key={n}>
          <div className="head"><h3>{n} ({lists[n].length})</h3>
            <span><button onClick={() => play(lists[n], 0)}>▶ Play</button><button onClick={() => window.confirm(`Delete "${n}"?`) && deleteList(n)}>Delete</button></span></div>
          <SongsList songs={lists[n]} onRemove={(s) => removeFrom(n, s.id)} />
        </section>
      ))}
    </>
  )
}
