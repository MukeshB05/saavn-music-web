import { useState } from 'react'
import { usePlayer } from '../context.jsx'
import SongsList from '../components/SongsList.jsx'
import AlbumItems from '../components/AlbumItems.jsx'
import ArtistItems from '../components/ArtistItems.jsx'
import Playlist from './Playlist.jsx'

export default function Library() {
  const { favs, saved, lists, history, clearHistory, play } = usePlayer()
  const [tab, setTab] = useState('songs')
  const tabs = [['songs', `Liked Songs ${favs.length}`], ['albums', `Albums ${saved.albums.length}`], ['artists', `Artists ${saved.artists.length}`], ['lists', `Playlists ${Object.keys(lists).length}`], ['history', 'History']]
  const shuffleAll = () => { const all = [...favs, ...Object.values(lists).flat()].sort(() => Math.random() - 0.5); all.length && play(all, 0) }
  return (
    <>
      <div className="head"><h2>My Library</h2><button className="primary" onClick={shuffleAll}>🔀 Shuffle All</button></div>
      <div className="tabs">{tabs.map(([k, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}</div>
      {tab === 'songs' && <SongsList songs={favs} />}
      {tab === 'albums' && <div className="grid">{saved.albums.map((a) => <AlbumItems key={a.id} item={a} />)}</div>}
      {tab === 'artists' && <div className="grid">{saved.artists.map((a) => <ArtistItems key={a.id} item={a} />)}</div>}
      {tab === 'lists' && <Playlist />}
      {tab === 'history' && <><button onClick={clearHistory}>Clear</button><SongsList songs={history} /></>}
    </>
  )
}
