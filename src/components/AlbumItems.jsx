import { Link } from 'react-router-dom'
import { img, nm } from '../api.js'

export default function AlbumItems({ item }) {
  return <Link to={`/album/${item.id}`} className="card"><img src={img(item)} alt="" /><b>{nm(item)}</b><small>{item.subtitle || item.year || 'Album'}</small></Link>
}
