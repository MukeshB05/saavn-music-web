import { useNavigate } from 'react-router-dom'
import { get, img, list, nm, useApi } from '../api.js'
import { usePlayer } from '../context.jsx'
import MiniSlider from './miniSlider.jsx'

// Recommended Artist Stations: tap an artist -> artist radio station
export default function ArtistStations() {
  const { langs } = usePlayer()
  const go = useNavigate()
  const { data, error, loading } = useApi('/top-artists?limit=20')
  const open = async (a) => {
    try { const s = await get(`/radio/artist?name=${encodeURIComponent(nm(a))}&language=${langs[0]}`); go(`/radio/${s.stationid}`) } catch (e) { alert(e.message) }
  }
  return (
    <MiniSlider title="Recommended Artist Stations" loading={loading} error={error}>
      {list(data).map((a) => <div key={a.id} className="card round" onClick={() => open(a)}><img src={img(a)} alt="" /><b>{nm(a)}</b><small>Artist Radio</small></div>)}
    </MiniSlider>
  )
}
