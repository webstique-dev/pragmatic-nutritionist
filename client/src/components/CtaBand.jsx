import { MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import { useBook } from '../context/bookContext'
import { wa } from '../data/site'
import Section from './Section'

export default function CtaBand({
  title = 'Ready to Transform Your Nutrition?',
  text = 'From gut recovery to peak athletic performance: personalised plans built on real clinical expertise.'
}) {
  const openBook = useBook()

  return (
    <Section width="wide" bg="olive" className="cta-editorial-band-section">
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">DISCOVERY.</span>
        <span className="divider-line" />
        <span className="divider-label">CARE PROTOCOLS.</span>
      </div>

      <div className="cta-band-editorial-content">
        <span className="section-eyebrow">BEGIN TODAY</span>
        <h2 className="cta-editorial-heading">
          Take the First Step Toward <em>Lasting Wellness</em>
        </h2>
        <p className="cta-editorial-subtext">{text}</p>

        <div className="cta-buttons-editorial-row">
          <button type="button" className="btn-editorial-pill-primary" onClick={openBook}>
            <span>Book Free Discovery Call</span>
            <ArrowRight size={15} strokeWidth={2.25} aria-hidden="true" />
          </button>
          <a
            className="btn-editorial-pill-secondary btn-no-underline"
            href={wa('Hi Meenu, I would like to explore your nutrition consultation programs.')}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={15} strokeWidth={2.25} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="cta-guarantee-editorial-note">
          <CheckCircle2 size={13} strokeWidth={2.5} className="text-moss" />
          <span>NO GENERIC TEMPLATES • 100% EVIDENCE-BASED • ONLINE GLOBALLY</span>
        </div>
      </div>
    </Section>
  )
}
