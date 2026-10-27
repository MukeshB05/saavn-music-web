import { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../context.jsx'
import { artistsOf, audio, img, mmss, useApi } from '../api.js'
import SongGrid from './SongGrid.jsx'
import AlbumSlider from './AlbumSlider.jsx'
import MiniSlider from './miniSlider.jsx'
import ArtistItems from './ArtistItems.jsx'

// Full-screen sheet: You Might Like, Currently Trending Albums, Top Albums from Same Year, Artists
function Sheet({ song, onClose }) {
  const { langs } = usePlayer()
  const like = useApi(`/song/${song.id}/suggestions?limit=12`)
  return (
    <div className="sheet">
      <button onClick={onClose}>⌄ Close</button>
      <div className="detail"><img src={img(song)} alt="" /><div><h1>{song.name}</h1><p className="muted">{artistsOf(song)}</p><small>{song.album?.name}</small></div></div>
      <h2>You Might Like</h2>
      {like.error ? <p className="err">{like.error}</p> : <SongGrid songs={like.data || []} />}
      <AlbumSlider title="Currently Trending Albums" path={`/top-albums?limit=15&language=${langs[0]}`} />
      {song.year && <AlbumSlider title={`Top Albums from ${song.year}`} path={`/albums/top?year=${song.year}&language=${langs[0]}`} />}
      <MiniSlider title="Artists">{(song.artists?.primary || []).map((a) => <ArtistItems key={a.id} item={a} />)}</MiniSlider>
    </div>
  )
}

export default function Player() {
  const { song, playing, setPlaying, next, prev, isFav, toggleFav } = usePlayer()
  const a = useRef(null)
  const [t, setT] = useState(0)
  const [d, setD] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => { if (song) { a.current.src = audio(song) || ''; a.current.play().catch(() => {}) } }, [song?.id])
  useEffect(() => { playing ? a.current.play().catch(() => {}) : a.current.pause() }, [playing])

  return (
    <>
      {open && song && <Sheet song={song} onClose={() => setOpen(false)} />}
      <div className="player">
        <audio ref={a} onTimeUpdate={(e) => setT(e.target.currentTime)} onLoadedMetadata={(e) => setD(e.target.duration)}
          onEnded={next} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
        {song ? (
          <>
            <img src={img(song)} alt="" onClick={() => setOpen(!open)} />
            <div className="meta" onClick={() => setOpen(!open)}><b>{song.name}</b><small>{artistsOf(song)}</small></div>
            <div className="ctl"><button onClick={prev}>⏮</button><button onClick={() => setPlaying(!playing)}>{playing ? '⏸' : '▶'}</button><button onClick={next}>⏭</button></div>
            <span>{mmss(t)}</span>
            <input type="range" min="0" max={d || 0} value={t} onChange={(e) => (a.current.currentTime = e.target.value)} />
            <span>{mmss(d)}</span>
            <button onClick={() => toggleFav(song)}>{isFav(song) ? '❤' : '♡'}</button>
          </>
        ) : <span className="muted">Pick a song to start playing</span>}
      </div>
    </>
  )
}
