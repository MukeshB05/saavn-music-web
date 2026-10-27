import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Navigator from './Navigator.jsx'
import Player from './Player.jsx'
import Footer from './footer.jsx'
import LanguageModal from './LanguageModal.jsx'

export default function MainSection() {
  const [lang, setLang] = useState(!localStorage.getItem('langsChosen')) // first visit: ask languages
  return (
    <div className="layout">
      <Navbar onLang={() => setLang(true)} />
      <Navigator />
      <main><Outlet /><Footer /></main>
      <Player />
      {lang && <LanguageModal onClose={() => setLang(false)} />}
    </div>
  )
}
