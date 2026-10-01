import { Link, useLocation } from 'react-router-dom'
import {
  wa,
  PHONE,
  EMAIL,
  HPR_ID,
  MEDICAL_DISCLAIMER,
  RESULTS_DISCLAIMER,
  FOOTER_NAV,
  LEGAL_LINKS,
  SOCIAL_LINKS
} from '../data/site'
import logoImg from '../assets/Pragmatic_logo.png'

export default function Footer() {
  const location = useLocation()

  const renderSocialIcon = (kind) => {
    switch (kind) {
      case 'youtube':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        )
      case 'whatsapp':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.764.46 3.486 1.332 5.006L2 22l5.12-1.314a9.98 9.98 0 0 0 4.884 1.27h.004c5.523 0 10.004-4.48 10.004-10.004C22.012 6.48 17.527 2 12.004 2zm5.836 14.204c-.244.686-1.42 1.31-1.956 1.392-.516.08-1.188.113-3.824-.977-3.37-1.393-5.545-4.835-5.714-5.06-.164-.225-1.36-1.81-1.36-3.453 0-1.643.86-2.453 1.166-2.788.307-.335.67-.42.894-.42.224 0 .448.002.645.012.207.01.485-.078.758.577.28.67.955 2.33.104 2.512.088.18.147.393.03.626-.118.234-.177.38-.352.585-.176.205-.37.457-.528.614-.176.175-.36.365-.155.716.205.352.913 1.506 1.958 2.438 1.345 1.198 2.48 1.57 2.833 1.745.352.176.557.147.763-.088.205-.235.88-1.026 1.114-1.378.235-.352.47-.293.79-.176.323.117 2.052.968 2.404 1.144.352.176.586.264.674.41.088.147.088.851-.156 1.537z"/>
          </svg>
        )
      case 'instagram':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        )
      case 'facebook':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.846-.14-2.82 0-4.654 1.72-4.654 4.8v2.7H7v4h3V22h4v-8.5z"/>
          </svg>
        )
      case 'linkedin':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5V10.13H5.07V18.5h2.79z"/>
          </svg>
        )
      case 'pinterest':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.854 0 1.266.641 1.266 1.41 0 .86-.547 2.144-.83 3.335-.236.996.499 1.808 1.481 1.808 1.778 0 3.144-1.875 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.134-4.515 4.34 0 .859.331 1.781.744 2.282a.3.3 0 0 1 .069.288c-.076.315-.246.996-.28.136-.044-.185-.145-.224-.336-.136-1.253-.583-2.036-2.409-2.036-3.878 0-3.155 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.221-5.19 6.221-1.013 0-1.966-.527-2.292-1.15l-.624 2.378c-.226.869-.838 1.958-1.248 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <footer className="osmo-footer editorial-footer-section" role="contentinfo">
      <div className="osmo-footer-container">
        
        {/* Top 4-Column Grid: Brand, Quick Links, Clinical Services, Contact Us */}
        <div className="osmo-footer-top-grid">
          
          {/* 1. Brand Column */}
          <div className="osmo-footer-col osmo-brand-col">
            <Link className="osmo-footer-logo-wrap" to="/" aria-label="Pragmatic Nutrition Home">
              <img src={logoImg} alt="Pragmatic Nutrition - Meenu Balaji" className="osmo-footer-logo-img" />
            </Link>
            <p className="osmo-brand-desc">
              Personalised, evidence-based nutrition support for Gut Health, Sports Nutrition, and Clinical Care.
            </p>
            <p className="osmo-brand-founder">
              Founded & led by <strong>Meenu Balaji, M.H.Sc</strong>. 14+ years of clinical practice.
            </p>
            <div className="osmo-brand-action">
              <a
                className="osmo-wa-pill-btn"
                href={wa('Hi Meenu, I would like to inquire about nutrition plans.')}
                target="_blank"
                rel="noreferrer"
                aria-label="Direct WhatsApp Inquiry with Meenu Balaji"
              >
                <svg className="osmo-btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                <span>WHATSAPP INQUIRY</span>
                <svg className="osmo-btn-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>

          {/* 2 & 3. Navigation Columns (Quick Links, Clinical Services) */}
          {FOOTER_NAV.map((col) => (
            <div key={col.title} className="osmo-footer-col">
              <h3 className="osmo-col-header">{col.title}</h3>
              <ul className="osmo-link-list">
                {col.links.map((link) => {
                  const isActive = location.pathname === link.to
                  return (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={`osmo-footer-link ${isActive ? 'active-link' : ''}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* 4. Contact Us Column (matches user's reference image exactly) */}
          <div className="osmo-footer-col osmo-contact-col">
            <h3 className="osmo-col-header osmo-contact-header">Contact Us</h3>
            <div className="osmo-contact-list">
              
              {/* Address */}
              <div className="osmo-contact-row">
                <svg className="osmo-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="osmo-contact-address">
                  <span>Five Furlong Road,</span>
                  <span>Guindy,</span>
                  <span>Chennai- 600032</span>
                </div>
              </div>

              {/* Email */}
              <div className="osmo-contact-row">
                <svg className="osmo-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a className="osmo-contact-link" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>

              {/* Phone */}
              <div className="osmo-contact-row">
                <svg className="osmo-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a className="osmo-contact-link" href={`tel:${PHONE.replace(/\s+/g, '')}`}>
                  {PHONE}
                </a>
              </div>

              {/* Social Icons Row */}
              <div className="osmo-social-icons-row" aria-label="Social media channels">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="osmo-social-icon-btn"
                    aria-label={`Follow on ${item.label}`}
                    title={item.label}
                  >
                    {renderSocialIcon(item.kind)}
                  </a>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Giant Watermark Signature Feature */}
        <div className="osmo-wordmark-container" aria-hidden="true">
          <span className="osmo-giant-wordmark">Pragmatic</span>
        </div>

        {/* Bottom Bar: Copyright, Legal Links, HPR ID & Disclaimers */}
        <div className="osmo-footer-bottom">
          <div className="osmo-bottom-bar">
            <span className="osmo-copyright">
              © {new Date().getFullYear()} PRAGMATIC NUTRITION. ALL RIGHTS RESERVED.
            </span>

            <div className="osmo-legal-links" aria-label="Legal policies">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="osmo-legal-link">
                  {link.label}
                </Link>
              ))}
            </div>

            <span className="osmo-hpr-meta">
              HPR ID: {HPR_ID}
            </span>
          </div>

          <div className="osmo-disclaimer-wrap">
            <p className="osmo-disclaimer-text">
              {MEDICAL_DISCLAIMER}
            </p>
            <p className="osmo-results-note">
              *{RESULTS_DISCLAIMER}
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
