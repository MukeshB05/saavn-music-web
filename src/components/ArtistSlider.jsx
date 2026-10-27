import { list, useApi } from '../api.js'
import MiniSlider from './miniSlider.jsx'
import ArtistItems from './ArtistItems.jsx'

export default function ArtistSlider({ title = 'Top Artists', path = '/top-artists?limit=20' }) {
  const { data, error, loading } = useApi(path)
  return <MiniSlider title={title} loading={loading} error={error}>{list(data).map((x) => <ArtistItems key={x.id} item={x} />)}</MiniSlider>
}
