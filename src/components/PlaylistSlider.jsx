import { list, useApi } from '../api.js'
import MiniSlider from './miniSlider.jsx'
import PlaylistItems from './PlaylistItems.jsx'

export default function PlaylistSlider({ title = 'Featured Playlists', path = '/featured-playlists?limit=20' }) {
  const { data, error, loading } = useApi(path)
  return <MiniSlider title={title} loading={loading} error={error}>{list(data).map((x) => <PlaylistItems key={x.id} item={x} />)}</MiniSlider>
}
