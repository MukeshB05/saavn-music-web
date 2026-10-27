import { useRef } from 'react'

// Generic horizontal slider; every other slider reuses it.
export default function MiniSlider({ title, loading, error, children }) {
  const r = useRef(null)
  const by = (n) => r.current.scrollBy({ left: n * 600, behavior: 'smooth' })
  return (
    <section className="slider">
      <div className="head"><h2>{title}</h2><span><button onClick={() => by(-1)}>‹</button><button onClick={() => by(1)}>›</button></span></div>
      {error ? <p className="err">{error}</p> : loading ? <p className="muted">Loading…</p> : <div className="track" ref={r}>{children}</div>}
    </section>
  )
}
