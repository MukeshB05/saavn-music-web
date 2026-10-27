import { Route, Routes } from 'react-router-dom'
import MainSection from './components/MainSection.jsx'
import Home from './pages/Home.jsx'
import SearchResult from './pages/SearchResult.jsx'
import AlbumDetails from './pages/AlbumDetails.jsx'
import ArtistsDetails from './pages/ArtistsDetails.jsx'
import PlaylistDetails from './pages/PlaylistDetails.jsx'
import RadioStationId from './pages/RadioStationId.jsx'
import Favourite from './pages/Favourite.jsx'
import Playlist from './pages/Playlist.jsx'
import Library from './pages/Library.jsx'
import Create from './pages/Create.jsx'
import Settings from './pages/Settings.jsx'
import SpotifyImport from './pages/SpotifyImport.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<MainSection />}>
        <Route index element={<Home />} />
        <Route path="search" element={<SearchResult />} />
        <Route path="album/:id" element={<AlbumDetails />} />
        <Route path="artist/:id" element={<ArtistsDetails />} />
        <Route path="playlist/:id" element={<PlaylistDetails />} />
        <Route path="radio/:id" element={<RadioStationId />} />
        <Route path="library" element={<Library />} />
        <Route path="create" element={<Create />} />
        <Route path="settings" element={<Settings />} />
        <Route path="favourites" element={<Favourite />} />
        <Route path="playlists" element={<Playlist />} />
        <Route path="spotify-import" element={<SpotifyImport />} />
      </Route>
    </Routes>
  )
}
