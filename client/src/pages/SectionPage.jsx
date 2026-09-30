import { useSeo } from '../components/Seo'
import PageHero from '../components/PageHero'
import CtaBand from '../components/CtaBand'

// Wraps an existing reusable component (checker, results, faq) in a standard page.
export default function SectionPage({ page, children }) {
  useSeo(page.label, page.blurb)
  return (
    <>
      <PageHero title={page.label} blurb={page.blurb} parent={page.parent} />
      {children}
      <CtaBand />
    </>
  )
}
