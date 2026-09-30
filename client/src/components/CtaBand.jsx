import { MessageCircle, CheckCircle2 } from 'lucide-react'
import { useBook } from '../context/bookContext'
import { wa } from '../data/site'
import Section from './Section'

export default function CtaBand({
  title = 'Ready to feel at ease in your body?',
  text = 'Book a 15-minute free discovery call to discuss your symptoms and get a clear roadmap.'
}) {
  const openBook = useBook()

  return (
    <Section width="full" bg="forest" className="cta-band-section">
      <div className="cta-band-content">
        <span className="cta-badge">TAKE THE FIRST STEP</span>
        <h2 className="cta-heading">{title}</h2>
        <p className="cta-subtext">{text}</p>
        
        <div className="cta-buttons-row">
          <button className="btn btn-light btn-lg" onClick={openBook}>
            Book Free Call
          </button>
          <a
            className="btn btn-outline-light btn-lg btn-no-underline"
            href={wa('Hi Meenu, I would like to explore your nutrition consultation programs.')}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} strokeWidth={2.25} style={{ marginRight: '6px' }} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="cta-guarantee-note">
          <CheckCircle2 size={13} strokeWidth={2.5} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
          <span>NO OBLIGATIONS • 100% CONFIDENTIAL • AVAILABLE ACROSS INDIA</span>
        </div>
      </div>
    </Section>
  )
}
