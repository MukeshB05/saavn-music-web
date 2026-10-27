import { Link } from 'react-router-dom'
import { img, nm } from '../api.js'

export default function PlaylistItems({ item }) {
  return <Link to={`/playlist/${item.id}`} className="card"><img src={img(item)} alt="" /><b>{nm(item)}</b><small>{item.subtitle || 'Playlist'}</small></Link>
}
