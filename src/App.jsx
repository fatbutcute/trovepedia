import { Routes, Route } from 'react-router-dom'

import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import TroveArchive from './pages/Archive/TroveArchive';

import Home            from './pages/Home'
import GuidesPage      from './pages/GuidesPage'
import PlaceholderPage from './pages/PlaceholderPage'
import RotationsPage   from './pages/RotationsPage'
import DelvePage       from './pages/DelvePage'
import ClassesPage     from './pages/ClassesPage'
import StarChart   from './components/StarChart'
import ClubsPage from './pages/ClubsPage';
import GuideDetailPage from './pages/GuideDetailPage';
import TroveNewsPage from './components/TroveNewsPage';
import FishingPage from './pages/FishingPage';
import CalculatorsPage from './components/CalculatorsPage';
import TokenCall from './components/TokenCall';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main style={{ paddingTop: '64px' }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/guides" element={<GuidesPage />} />

          <Route path="/classes" element={<ClassesPage />} />

          <Route path="/delve" element={<DelvePage />} />

          <Route path="/rotations" element={<RotationsPage />} />

          <Route path="/archive" element={<TroveArchive />} />

          <Route path="/starchart" element={<StarChart />} />

          <Route path="/clubs" element={<ClubsPage />} />

          <Route path="/guides/:slug" element={<GuideDetailPage />} />

          <Route path="/news" element={<TroveNewsPage />} />

          <Route path="/fishing" element={<FishingPage />} />

          <Route path="/calculators" element={<CalculatorsPage />} />

          <Route path="/token-test" element={<TokenCall />} />

          <Route
            path="/fishing"
            element={
              <PlaceholderPage
                icon="🐟"
                title="Fishing"
                desc="The fishing database is under development."
              />
            }
          />
          <Route
            path="/calculator"
            element={
              <PlaceholderPage
                icon="💡"
                title="Calculators"
                desc="The PR calculator is under development."
              />
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <PlaceholderPage
                icon="🔍"
                title="404 – Page Not Found"
                desc="This page does not exist."
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  )
}