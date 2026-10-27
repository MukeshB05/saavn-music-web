import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useApi } from '../api.js'
import SongsList from '../components/SongsList.jsx'
import MiniSlider from '../components/miniSlider.jsx'
import AlbumItems from '../components/AlbumItems.jsx'
import ArtistItems from '../components/ArtistItems.jsx'
import PlaylistItems from '../components/PlaylistItems.jsx'

export default function SearchResult() {
  const [sp, setSp] = useSearchParams()
  const [text, setText] = useState(sp.get('q') || '')
  const q = encodeURIComponent(sp.get('q') || '')
  const on = !!sp.get('q')
  const songs = useApi(!on ? null : `/search/songs?query=${q}&limit=20`)
  const albums = useApi(!on ? null : `/search/albums?query=${q}&limit=15`)
  const artists = useApi(!on ? null : `/search/artists?query=${q}&limit=15`)
  const lists = useApi(!on ? null : `/search/playlists?query=${q}&limit=15`)
  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); setSp({ q: text.trim() }) }}><input autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder="Search songs, albums, artists, playlists" /></form>
      {!on && <p className="muted">Type something to search.</p>}
      {songs.error ? <p className="err">{songs.error}</p> : <SongsList songs={songs.data?.results} />}
      <MiniSlider title="Albums" loading={albums.loading} error={albums.error}>{(albums.data?.results || []).map((x) => <AlbumItems key={x.id} item={x} />)}</MiniSlider>
      <MiniSlider title="Artists" loading={artists.loading} error={artists.error}>{(artists.data?.results || []).map((x) => <ArtistItems key={x.id} item={x} />)}</MiniSlider>
      <MiniSlider title="Playlists" loading={lists.loading} error={lists.error}>{(lists.data?.results || []).map((x) => <PlaylistItems key={x.id} item={x} />)}</MiniSlider>
    </>
  )
}
