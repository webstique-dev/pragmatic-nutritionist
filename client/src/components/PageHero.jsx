import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function PageHero({ title, blurb, parent }) {
  return (
    <header className="page-hero-section">
      <div className="page-hero-container">
        <nav className="breadcrumbs-nav" aria-label="Breadcrumbs">
          <Link to="/" className="breadcrumb-link">Home</Link>
          {parent && (
            <>
              <ChevronRight size={13} strokeWidth={2} className="breadcrumb-separator" aria-hidden="true" />
              <Link to={parent.to} className="breadcrumb-link">{parent.label}</Link>
            </>
          )}
          <ChevronRight size={13} strokeWidth={2} className="breadcrumb-separator" aria-hidden="true" />
          <span className="breadcrumb-current" aria-current="page">{title}</span>
        </nav>

        <h1 className="page-hero-title">{title}</h1>
        {blurb && <p className="page-hero-blurb">{blurb}</p>}
      </div>
    </header>
  )
}
