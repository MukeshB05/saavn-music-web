import { Link } from 'react-router-dom'
import { img, nm } from '../api.js'

export default function ArtistItems({ item }) {
  return <Link to={`/artist/${item.id}`} className="card round"><img src={img(item)} alt="" /><b>{nm(item)}</b><small>Artist</small></Link>
}
