import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar" aria-label="Primary navigation">
      <div className="navbar__brand">
        <div className="navbar__logo" aria-hidden="true">
          <span className="navbar__logo-skull" />
        </div>
        <div>
          <p className="navbar__eyebrow">The Grand Line</p>
          <h1 className="navbar__title">ONE PIECE</h1>
        </div>
      </div>

      <nav className="navbar__nav" aria-label="Main menu">
        <a href="#" className="navbar__link">Voyage</a>
        <a href="#" className="navbar__link">Crew</a>
        <a href="#" className="navbar__link">Treasure</a>
        <a href="#" className="navbar__link">Legacy</a>
      </nav>
    </header>
  )
}
