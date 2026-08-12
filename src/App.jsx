import { Routes, Route } from 'react-router-dom'
import { useLanguage } from './context/LanguageContext'

import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import ScrollToTop     from './components/ScrollToTop'
import TroveArchive    from './pages/Archive/TroveArchive'

import Home            from './pages/Home'
import PlaceholderPage from './pages/PlaceholderPage'
import RotationsPage   from './pages/RotationsPage'
import DelvePage       from './pages/DelvePage'
import ClassesPage     from './pages/ClassesPage'
import StarChart       from './components/StarChart'
import ClubsPage       from './pages/ClubsPage'
import TroveNewsPage   from './components/TroveNewsPage'
import FishingPage     from './pages/FishingPage'
import CalculatorsPage from './components/CalculatorsPage'
import TokenCall       from './components/TokenCall'

import GuideViewer     from './components/guides/GuideViewer'

export default function App() {
  const { t } = useLanguage(); // ⬅️ I18n hook behívása (ha használni szeretnéd az App.jsx-en belül)

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main style={{ paddingTop: '64px' }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/guides" element={<GuideViewer />} />
          <Route path="/guides/:guideId" element={<GuideViewer />} />

          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/delve" element={<DelvePage />} />
          <Route path="/rotations" element={<RotationsPage />} />
          <Route path="/archive" element={<TroveArchive />} />
          <Route path="/starchart" element={<StarChart />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/news" element={<TroveNewsPage />} />
          <Route path="/fishing" element={<FishingPage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/hub" element={<TokenCall />} />

          {/* Placeholders / 404 */}
          <Route
            path="*"
            element={
              <PlaceholderPage
                icon="🔍"
                title={t('errors.notFoundTitle') || "404 – Page Not Found"}
                desc={t('errors.notFoundDesc') || "This page does not exist."}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  )
}