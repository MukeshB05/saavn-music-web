import { createContext, useContext, useEffect, useState } from 'react'
import { get } from './api.js'

const Ctx = createContext()
export const usePlayer = () => useContext(Ctx)
const ld = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const useLS = (k, d) => { const [v, s] = useState(() => ld(k, d)); useEffect(() => localStorage.setItem(k, JSON.stringify(v)), [k, v]); return [v, s] }

export function PlayerProvider({ children }) {
  const [queue, setQueue] = useState([])
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [favs, setFavs] = useLS('favs', [])
  const [lists, setLists] = useLS('lists', {})
  const [saved, setSaved] = useLS('saved', { albums: [], artists: [] })
  const [history, setHistory] = useLS('history', [])
  const [langs, setLangs] = useLS('langs', ['tamil', 'malayalam'])
  const [cfg, setCfg] = useLS('cfg', { quality: '160', autoplay: true, noExplicit: false })
  const song = queue[idx]

  useEffect(() => { if (song) setHistory((h) => [song, ...h.filter((x) => x.id !== song.id)].slice(0, 30)) }, [song?.id])

  const play = (songs, i = 0) => {
    const target = songs[i]
    const l = cfg.noExplicit ? songs.filter((s) => !s.explicitContent) : songs
    setQueue(l); setIdx(Math.max(0, l.findIndex((s) => s.id === target?.id))); setPlaying(true)
  }
  const next = async () => {
    if (idx < queue.length - 1) return setIdx(idx + 1)
    if (cfg.autoplay && song) { // Autoplay: keep going with similar songs
      try { const more = await get(`/song/${song.id}/suggestions?limit=10`); if (more.length) { setQueue((q) => [...q, ...more]); return setIdx(idx + 1) } } catch {}
    }
    setIdx(0)
  }
  const prev = () => queue.length && setIdx((i) => (i - 1 + queue.length) % queue.length)
  const isFav = (s) => favs.some((f) => f.id === s.id)
  const toggleFav = (s) => setFavs((f) => (f.some((x) => x.id === s.id) ? f.filter((x) => x.id !== s.id) : [s, ...f]))
  const createList = (n) => n && setLists((l) => (l[n] ? l : { ...l, [n]: [] }))
  const addTo = (n, s) => n && setLists((l) => ({ ...l, [n]: (l[n] || []).some((x) => x.id === s.id) ? l[n] : [...(l[n] || []), s] }))
  const removeFrom = (n, id) => setLists((l) => ({ ...l, [n]: l[n].filter((x) => x.id !== id) }))
  const deleteList = (n) => setLists((l) => { const c = { ...l }; delete c[n]; return c })
  const isSaved = (k, id) => saved[k].some((x) => x.id === id)
  const toggleSaved = (k, it) => setSaved((s) => ({ ...s, [k]: s[k].some((x) => x.id === it.id) ? s[k].filter((x) => x.id !== it.id) : [it, ...s[k]] }))

  return (
    <Ctx.Provider value={{ song, playing, setPlaying, play, next, prev, favs, isFav, toggleFav, lists, createList, addTo, removeFrom, deleteList,
      saved, isSaved, toggleSaved, history, clearHistory: () => setHistory([]), langs, setLangs, cfg, setCfg }}>
      {children}
    </Ctx.Provider>
  )
}
