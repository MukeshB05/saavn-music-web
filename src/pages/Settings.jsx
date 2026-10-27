import { useRef, useState } from 'react'
import { usePlayer } from '../context.jsx'
import LanguageModal from '../components/LanguageModal.jsx'

export default function Settings() {
  const { cfg, setCfg, langs, setPlaying } = usePlayer()
  const [lang, setLang] = useState(false)
  const [sleep, setSleep] = useState('0')
  const timer = useRef(null)
  const set = (k, v) => setCfg({ ...cfg, [k]: v })
  const pickSleep = (m) => { setSleep(m); clearTimeout(timer.current); if (+m) timer.current = setTimeout(() => setPlaying(false), +m * 60000) }
  const Row = ({ label, children }) => <div className="row"><b className="grow">{label}</b>{children}</div>
  const Sw = ({ k }) => <input type="checkbox" checked={!!cfg[k]} onChange={(e) => set(k, e.target.checked)} />
  return (
    <>
      <h2>Settings</h2>
      <Row label="Streaming Quality">
        <select value={cfg.quality} onChange={(e) => set('quality', e.target.value)}>
          <option value="12">Low (12 kbps)</option><option value="48">Normal (48 kbps)</option><option value="96">High (96 kbps)</option><option value="160">Really High (160 kbps)</option><option value="320">Extreme (320 kbps)</option>
        </select>
      </Row>
      <Row label="Music Languages"><button onClick={() => setLang(true)}>{langs.join(', ')} ›</button></Row>
      <Row label="Sleep Timer">
        <select value={sleep} onChange={(e) => pickSleep(e.target.value)}><option value="0">Off</option><option value="15">15 min</option><option value="30">30 min</option><option value="60">60 min</option></select>
      </Row>
      <Row label="Disable Explicit Content"><Sw k="noExplicit" /></Row>
      <Row label="Autoplay (keep playing similar songs)"><Sw k="autoplay" /></Row>
      {lang && <LanguageModal onClose={() => setLang(false)} />}
    </>
  )
}
