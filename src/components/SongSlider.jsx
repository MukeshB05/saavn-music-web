import { artistsOf, img, useApi } from '../api.js'
import { usePlayer } from '../context.jsx'
import MiniSlider from './miniSlider.jsx'

// Pass `songs` (e.g. Recently Played) or a search `query` (e.g. Trending Now)
export default function SongSlider({ title, songs, query }) {
  const { play } = usePlayer()
  const r = useApi(!songs && query ? `/search/songs?query=${encodeURIComponent(query)}&limit=20` : null)
  const list = songs || r.data?.results || []
  return (
    <MiniSlider title={title} loading={r.loading} error={r.error}>
      {list.map((s, i) => <div key={s.id} className="card" onClick={() => play(list, i)}><img src={img(s)} alt="" /><b>{s.name}</b><small>{artistsOf(s)}</small></div>)}
    </MiniSlider>
  )
}
