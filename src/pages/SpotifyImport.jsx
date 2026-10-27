import { useState } from 'react'
import { get } from '../api.js'
import { usePlayer } from '../context.jsx'

function LinkImport() {
  const { toggleFav, isFav, toggleSaved, createList, addTo } = usePlayer()
  const [url, setUrl] = useState('')
  const [msg, setMsg] = useState('')
  const run = async () => {
    setMsg('Importing…')
    const l = encodeURIComponent(url.trim())
    try {
      if (/\/song\//.test(url)) { const d = await get(`/song?link=${l}`); const x = Array.isArray(d) ? d[0] : d; if (!isFav(x)) toggleFav(x); setMsg(`❤ Liked “${x.name}”`) }
      else if (/\/album\//.test(url)) { const d = await get(`/album?link=${l}`); toggleSaved('albums', { id: d.id, name: d.name, image: d.image }); setMsg(`💿 Saved album “${d.name}”`) }
      else if (/playlist|featured/.test(url)) { const d = await get(`/playlist?link=${l}&limit=100`); createList(d.name); d.songs.forEach((x) => addTo(d.name, x)); setMsg(`🎶 Imported playlist “${d.name}” (${d.songs.length})`) }
      else setMsg('Paste a JioSaavn song, album or playlist link.')
    } catch (e) { setMsg('❌ ' + e.message) }
  }
  return (
    <>
      <h3>Import from a JioSaavn link</h3>
      <p className="muted">Song → Liked songs · Album → Library albums · Playlist → My playlists</p>
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.jiosaavn.com/song/…" />
      <button className="primary" disabled={!url.trim()} onClick={run}>Import link</button> <span>{msg}</span>
      <hr />
    </>
  )
}

export default function SpotifyImport() {
  const { addTo } = usePlayer()
  const [name, setName] = useState('Spotify Import')
  const [text, setText] = useState('')
  const [log, setLog] = useState([])
  const [busy, setBusy] = useState(false)

  async function run() {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
    setBusy(true); setLog([])
    for (const line of lines) {
      try {
        const r = await get(`/search/songs?query=${encodeURIComponent(line)}&limit=1`)
        const hit = r.results?.[0]
        if (hit) addTo(name, hit)
        setLog((l) => [...l, `${hit ? '✅' : '❌'} ${line}${hit ? ' → ' + hit.name : ''}`])
      } catch (e) { setLog((l) => [...l, `❌ ${line} (${e.message})`]) }
    }
    setBusy(false)
  }

  return (
    <>
      <h2>⬇ Import</h2>
      <LinkImport />
      <h3>Import a Spotify track list</h3>
      <p className="muted">Spotify's API needs a login, so copy your playlist's tracks (open it, Ctrl+A, Ctrl+C) or paste a list, one "Song – Artist" per line. Each line is matched on Saavn and added to a local playlist.</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Playlist name" />
      <textarea rows="10" value={text} onChange={(e) => setText(e.target.value)} placeholder={'Kesariya - Arijit Singh\nTum Hi Ho - Arijit Singh'} />
      <button className="primary" disabled={busy || !text.trim()} onClick={run}>{busy ? 'Importing…' : 'Import'}</button>
      <pre className="log">{log.join('\n')}</pre>
    </>
  )
}
