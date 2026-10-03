import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, X, ArrowRight } from 'lucide-react'
import { MENU } from '../data/site'
import { useBook } from '../context/bookContext'
import logoImg from '../assets/Pragmatic_logo.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null)
  const [prevPathname, setPrevPathname] = useState('')
  const timeoutRef = useRef(null)
  const openBook = useBook()
  const location = useLocation()

  // Reset drawer state on route change during render without an effect
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    if (mobileOpen) setMobileOpen(false)
    if (activeDropdown) setActiveDropdown(null)
  }

  // Clear any pending dropdown close timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Track scroll position for navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on Escape key and prevent background body scroll when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setMobileOpen(false)
        setActiveDropdown(null)
      }
    }
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  const toggleMobileAccordion = (to) => {
    setOpenMobileAccordion(openMobileAccordion === to ? null : to)
  }

  const handleMouseEnter = (to) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveDropdown(to)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const closeAll = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setMobileOpen(false)
    setActiveDropdown(null)
  }

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <nav className="navbar-container" aria-label="Main Navigation">
          <Link className="navbar-logo" to="/" onClick={closeAll} aria-label="Meenu Balaji - Pragmatic Nutrition Home">
            <img src={logoImg} alt="Meenu Balaji - Pragmatic Nutritionist" className="navbar-logo-img" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="navbar-links" role="menubar">
            {MENU.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0)
              const isOpen = activeDropdown === item.to

              return (
                <li
                  key={item.to}
                  className={`nav-item ${hasChildren ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => hasChildren && handleMouseEnter(item.to)}
                  onMouseLeave={() => hasChildren && handleMouseLeave()}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeAll}
                    aria-haspopup={hasChildren ? 'true' : undefined}
                    aria-expanded={hasChildren ? isOpen : undefined}
                  >
                    <span>{item.label}</span>
                    {hasChildren && (
                      <ChevronDown className={`nav-caret ${isOpen ? 'open' : ''}`} size={14} strokeWidth={2.5} aria-hidden="true" />
                    )}
                  </NavLink>

                  {/* Mega-menu dropdown panel */}
                  {hasChildren && (
                    <div className={`mega-dropdown ${isOpen ? 'show' : ''}`} role="menu" aria-label={`${item.label} Submenu`}>
                      <div className="mega-dropdown-header">
                        <span className="mega-tag">{item.label}</span>
                        {item.blurb && <p className="mega-blurb">{item.blurb}</p>}
                      </div>
                      <div className="mega-dropdown-grid">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className="mega-item"
                            role="menuitem"
                            onClick={closeAll}
                          >
                            <span className="mega-item-title">{child.label}</span>
                            {child.blurb && <span className="mega-item-desc">{child.blurb}</span>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="navbar-actions">
            <button
              type="button"
              className="nav-editorial-cta"
              onClick={() => {
                closeAll()
                openBook()
              }}
              aria-label="Book a free consultation call"
            >
              <span>Get Started</span>
              <ArrowRight size={14} strokeWidth={2.25} aria-hidden="true" />
            </button>

            <button
              className="navbar-hamburger"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className={`hamburger-bar ${mobileOpen ? 'open' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`drawer-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={closeAll}
        aria-hidden="true"
      />

      {/* Mobile Fullscreen Slide-in Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="drawer-header">
          <Link className="navbar-logo" to="/" onClick={closeAll} aria-label="Meenu Balaji - Pragmatic Nutrition Home">
            <img src={logoImg} alt="Meenu Balaji - Pragmatic Nutritionist" className="navbar-logo-img" />
          </Link>
          <button className="drawer-close" onClick={closeAll} aria-label="Close navigation menu">
            <X size={22} strokeWidth={2.25} />
          </button>
        </div>

        <div className="drawer-body">
          <ul className="drawer-nav">
            {MENU.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0)
              const isAccordionOpen = openMobileAccordion === item.to

              return (
                <li key={item.to} className="drawer-item">
                  <div className="drawer-row">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => `drawer-link ${isActive ? 'active' : ''}`}
                      onClick={closeAll}
                    >
                      {item.label}
                    </NavLink>
                    {hasChildren && (
                      <button
                        className="drawer-accordion-btn"
                        onClick={() => toggleMobileAccordion(item.to)}
                        aria-expanded={isAccordionOpen}
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown className={`drawer-caret ${isAccordionOpen ? 'open' : ''}`} size={16} strokeWidth={2.5} />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <div className={`drawer-submenu ${isAccordionOpen ? 'open' : ''}`}>
                      <div className="drawer-submenu-inner">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className="drawer-sublink"
                            onClick={closeAll}
                          >
                            <span className="sublink-title">{child.label}</span>
                            {child.blurb && <span className="sublink-desc">{child.blurb}</span>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="drawer-footer">
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              closeAll()
              openBook()
            }}
          >
            Book Free Call
          </button>
        </div>
      </div>
    </>
  )
}
