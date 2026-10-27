import { list, useApi } from '../api.js'
import MiniSlider from './miniSlider.jsx'
import AlbumItems from './AlbumItems.jsx'

export default function AlbumSlider({ title = 'Top Albums', path = '/top-albums?limit=20' }) {
  const { data, error, loading } = useApi(path)
  return <MiniSlider title={title} loading={loading} error={error}>{list(data).map((x) => <AlbumItems key={x.id} item={x} />)}</MiniSlider>
}
