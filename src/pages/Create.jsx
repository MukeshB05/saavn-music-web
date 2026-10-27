import { useState } from 'react'
import { get } from '../api.js'
import { usePlayer } from '../context.jsx'
import SongsList from '../components/SongsList.jsx'
import AlbumItems from '../components/AlbumItems.jsx'

// Create: New Playlist · add Songs · save Albums · Like songs
export default function Create() {
  const { createList, lists, addTo, toggleSaved, isSaved, toggleFav } = usePlayer()
  const [mode, setMode] = useState('playlist')
  const [name, setName] = useState('')
  const [target, setTarget] = useState('')
  const [q, setQ] = useState('')
  const [res, setRes] = useState([])
  const names = Object.keys(lists)

  const search = async (e) => {
    e.preventDefault()
    try { const r = await get(`/search/${mode === 'albums' ? 'albums' : 'songs'}?query=${encodeURIComponent(q)}&limit=12`); setRes(r.results || []) } catch (x) { alert(x.message) }
  }
  const tabs = [['playlist', 'New Playlist'], ['songs', 'Songs'], ['albums', 'Albums'], ['like', 'Like']]
  return (
    <>
      <h2>Create</h2>
      <div className="tabs">{tabs.map(([k, l]) => <button key={k} className={mode === k ? 'on' : ''} onClick={() => { setMode(k); setRes([]) }}>{l}</button>)}</div>
      {mode === 'playlist' ? (
        <form onSubmit={(e) => { e.preventDefault(); createList(name.trim()); setName('') }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Playlist name" />
          <button className="primary" disabled={!name.trim()}>＋ Create playlist</button>
          <p className="muted">{names.length ? 'Your playlists: ' + names.join(', ') : 'No playlists yet.'}</p>
        </form>
      ) : (
        <>
          {mode === 'songs' && <select value={target} onChange={(e) => setTarget(e.target.value)}><option value="">Add to which playlist?</option>{names.map((n) => <option key={n}>{n}</option>)}</select>}
          <form onSubmit={search}><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={mode === 'albums' ? 'Search albums to save' : 'Search songs'} /></form>
          {mode === 'albums' ? (
            <div className="grid">{res.map((a) => <div key={a.id}><AlbumItems item={a} /><button onClick={() => toggleSaved('albums', { id: a.id, name: a.name, image: a.image })}>{isSaved('albums', a.id) ? '✔ Saved' : '＋ Save'}</button></div>)}</div>
          ) : (
            <>
              <SongsList songs={res} />
              {res.length > 0 && <div className="row">
                {mode === 'songs' && <button disabled={!target} onClick={() => res.forEach((s) => addTo(target, s))}>＋ Add all to “{target || '…'}”</button>}
                {mode === 'like' && <button onClick={() => res.forEach((s) => toggleFav(s))}>♥ Toggle like on all</button>}
              </div>}
            </>
          )}
        </>
      )}
    </>
  )
}
