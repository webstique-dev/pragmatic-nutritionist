import { Calendar } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { wa } from '../data/site'
import { useBook } from '../context/bookContext'

export default function StickyCta() {
  const openBook = useBook()

  return (
    <div className="sticky-cta-container" aria-label="Quick Actions">
      {/* WhatsApp Button */}
      <a
        className="sticky-btn sticky-wa btn-no-underline"
        href={wa('Hi Meenu, I would like to make an inquiry about your programs.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon className="sticky-icon" size={19} />
        <span className="sticky-label">WHATSAPP</span>
      </a>

      {/* Book Discovery Call Button */}
      <button
        className="sticky-btn sticky-book"
        onClick={openBook}
        aria-label="Book Free Call"
        title="Book Free Discovery Call"
      >
        <Calendar className="sticky-icon" size={18} strokeWidth={2.25} aria-hidden="true" />
        <span className="sticky-label">BOOK CALL</span>
      </button>
    </div>
  )
}

