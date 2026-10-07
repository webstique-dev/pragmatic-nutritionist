import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { PAGES } from './data/site'
import { BookProvider } from './context/Book'
import ScrollProgress from './components/ScrollProgress'
import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StickyCta from './components/StickyCta'
import ResultsFilter from './components/ResultsFilter'
import Faq from './components/Faq'
import GutAssessmentPage from './pages/GutAssessmentPage'
import Home from './pages/Home'
import PlaceholderPage from './pages/PlaceholderPage'
import SectionPage from './pages/SectionPage'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const KINDS = {
  checker: <GutAssessmentPage />,
  results: <ResultsFilter title="Real people, real progress" />,
  faq: <Faq tight />
}

const element = (p) =>
  KINDS[p.kind] ? <SectionPage page={p}>{KINDS[p.kind]}</SectionPage> : <PlaceholderPage page={p} />

export default function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <NoiseOverlay />
        <ScrollProgress />
        <ScrollTop />
        <Navbar />
        <main className="main-content-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gut-health-checker" element={<GutAssessmentPage />} />
            <Route path="/gut-health-assessment" element={<GutAssessmentPage />} />
            <Route path="/gut-assessment" element={<GutAssessmentPage />} />
            {PAGES.map((p) => (
              <Route key={p.to} path={p.to} element={element(p)} />
            ))}
            <Route
              path="*"
              element={
                <PlaceholderPage
                  page={{
                    label: 'Page not found',
                    blurb: 'That page does not exist. Use the navigation menu above to find what you need.'
                  }}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
        <StickyCta />
      </BookProvider>
    </BrowserRouter>
  )
}
