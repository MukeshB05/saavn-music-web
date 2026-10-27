import { useParams } from 'react-router-dom'
import { useApi } from '../api.js'
import DetailHeader from '../components/DetailHeader.jsx'
import SongsList from '../components/SongsList.jsx'

export default function AlbumDetails() {
  const { id } = useParams()
  const { data, error, loading } = useApi(`/album/${id}`)
  if (loading) return <p className="muted">Loading…</p>
  if (error) return <p className="err">{error}</p>
  return <><DetailHeader kind="albums" item={data} songs={data.songs} sub={`${data.year || ''} · ${data.songs?.length || 0} songs`} /><SongsList songs={data.songs} /></>
}
