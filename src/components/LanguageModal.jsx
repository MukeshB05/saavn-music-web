import { useState } from 'react'
import { LANGS } from '../api.js'
import { usePlayer } from '../context.jsx'

export default function LanguageModal({ onClose }) {
  const { langs, setLangs } = usePlayer()
  const [sel, setSel] = useState(langs)
  const tog = (l) => setSel((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]))
  const save = () => { if (!sel.length) return; setLangs(sel); localStorage.setItem('langsChosen', '1'); onClose() }
  return (
    <div className="modal"><div className="box">
      <h3>What music do you like?</h3><small>Pick all the languages you want to listen to.</small>
      <div className="langs">{LANGS.map((L) => { const k = L.toLowerCase(); return <div key={k} className={sel.includes(k) ? 'on' : ''} onClick={() => tog(k)}>{L}{sel.includes(k) && ' ✔'}</div> })}</div>
      <button className="primary" onClick={save}>Update</button>
    </div></div>
  )
}
