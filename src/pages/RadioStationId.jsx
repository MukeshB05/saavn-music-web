import { useParams } from 'react-router-dom'
import { useApi } from '../api.js'
import DetailHeader from '../components/DetailHeader.jsx'
import SongsList from '../components/SongsList.jsx'

export default function RadioStationId() {
  const { id } = useParams()
  const { data, error, loading } = useApi(`/radio/${id}/songs?limit=30`)
  if (loading) return <p className="muted">Loading station…</p>
  if (error) return <p className="err">{error}</p>
  return <><DetailHeader item={{ name: 'Radio station', image: data[0]?.image }} songs={data} sub={`${data.length} songs`} /><SongsList songs={data} /></>
}
