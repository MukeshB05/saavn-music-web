import { useParams } from 'react-router-dom'
import { useApi } from '../api.js'
import DetailHeader from '../components/DetailHeader.jsx'
import SongsList from '../components/SongsList.jsx'
import MiniSlider from '../components/miniSlider.jsx'
import AlbumItems from '../components/AlbumItems.jsx'
import ArtistItems from '../components/ArtistItems.jsx'

export default function ArtistsDetails() {
  const { id } = useParams()
  const { data, error, loading } = useApi(`/artist/${id}`)
  if (loading) return <p className="muted">Loading…</p>
  if (error) return <p className="err">{error}</p>
  return (
    <>
      <DetailHeader kind="artists" item={data} songs={data.topSongs} sub={`${data.followerCount ? data.followerCount.toLocaleString() + ' followers' : 'Artist'}`} />
      <h2>Top songs</h2><SongsList songs={data.topSongs} />
      <MiniSlider title="Top albums">{(data.topAlbums || []).map((x) => <AlbumItems key={x.id} item={x} />)}</MiniSlider>
      <MiniSlider title="Similar artists">{(data.similarArtists || []).map((x) => <ArtistItems key={x.id} item={x} />)}</MiniSlider>
    </>
  )
}
