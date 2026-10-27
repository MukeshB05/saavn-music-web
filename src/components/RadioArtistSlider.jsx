import { Link } from 'react-router-dom'
import { useApi } from '../api.js'
import { usePlayer } from '../context.jsx'
import { artistsOf, img } from '../api.js'
import MiniSlider from './miniSlider.jsx'

// <RadioArtistSlider name="Tamil" language="tamil" />  ->  /radio/featured?name=Tamil&language=tamil
export default function RadioArtistSlider({ name, language }) {
  const { play } = usePlayer()
  const st = useApi(`/radio/featured?name=${encodeURIComponent(name)}&language=${language}`)
  const id = st.data?.stationid
  const songs = useApi(id ? `/radio/${id}/songs?limit=20` : null)
  const list = Array.isArray(songs.data) ? songs.data : []
  return (
    <MiniSlider title={`${name} Radio`} loading={st.loading || (id && songs.loading)} error={st.error || (id ? songs.error : null)}>
      {id && <Link to={`/radio/${id}`} className="card"><b>Open {name} station →</b></Link>}
      {list.map((s, i) => (
        <div key={s.id} className="card" onClick={() => play(list, i)}><img src={img(s)} alt="" /><b>{s.name}</b><small>{artistsOf(s)}</small></div>
      ))}
    </MiniSlider>
  )
}
