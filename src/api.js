import { useEffect, useState } from 'react'

const BASE = (import.meta.env.VITE_API_URL || 'https://saavn-api-mukesh.vercel.app/api').replace(/\/$/, '')

export async function get(path) {
  const res = await fetch(BASE + path)
  const json = await res.json().catch(() => ({}))
  if (!json.success) throw new Error(json.message || `Request failed (${res.status})`)
  return json.data
}

export function useApi(path) {
  const [state, set] = useState({ data: null, error: null, loading: true })
  useEffect(() => {
    let live = true
    if (!path) { set({ data: null, error: null, loading: false }); return }
    set({ data: null, error: null, loading: true })
    get(path).then((data) => live && set({ data, error: null, loading: false }))
      .catch((error) => live && set({ data: null, error: error.message, loading: false }))
    return () => { live = false }
  }, [path])
  return state
}

// raw JioSaavn lists come in different wrappers; always return an array
export const list = (d) => Array.isArray(d) ? d : d?.results || d?.data || d?.playlists || d?.albums || d?.artists || d?.songs || []
export const nm = (x) => x?.name || x?.title || ''
export const img = (x) => {
  const i = x?.image
  if (!i) return ''
  if (typeof i === 'string') return i.replace(/150x150|50x50/, '500x500').replace('http:', 'https:')
  return i[i.length - 1]?.url || ''
}
export const LANGS = ['Hindi','English','Punjabi','Tamil','Telugu','Marathi','Gujarati','Bengali','Kannada','Bhojpuri','Malayalam','Sanskrit','Haryanvi','Rajasthani','Odia','Assamese']
export const audio = (s) => {
  let q = '160'
  try { q = JSON.parse(localStorage.getItem('cfg')).quality || '160' } catch {}
  const d = s?.downloadUrl || []
  return (d.find((x) => String(x.quality).startsWith(q)) || d[d.length - 1] || {}).url
}
export const artistsOf = (s) => (s?.artists?.primary || []).map((a) => a.name).join(', ')
export const mmss = (n) => (n >= 0 ? `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, '0')}` : '0:00')
