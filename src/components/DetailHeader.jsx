import { img, nm } from '../api.js'
import { usePlayer } from '../context.jsx'

export default function DetailHeader({ item, songs, sub, kind }) {
  const { play, isSaved, toggleSaved, createList, addTo } = usePlayer()
  const save = () => {
    if (kind === 'playlist') { createList(nm(item)); (songs || []).forEach((s) => addTo(nm(item), s)); alert('Saved to your playlists') }
    else toggleSaved(kind, { id: item.id, name: nm(item), image: item.image })
  }
  return (
    <div className="detail">
      <img src={img(item)} alt="" />
      <div><h1>{nm(item)}</h1><p className="muted">{sub}</p>
        <button className="primary" disabled={!songs?.length} onClick={() => play(songs, 0)}>▶ Play all</button>
        {kind && <button onClick={save}>{kind !== 'playlist' && isSaved(kind, item.id) ? '✔ Saved' : '＋ Save'}</button>}</div>
    </div>
  )
}
