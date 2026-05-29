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

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main style={{ paddingTop: '64px' }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/guides" element={<GuidesPage />} />
          <Route
            path="/guides/:slug"
            element={
              <PlaceholderPage
                icon="📖"
                title="Guides"
                desc="Guides will be available soon."
              />
            }
          />

          <Route path="/classes" element={<ClassesPage />} />

          <Route path="/delve" element={<DelvePage />} />

          <Route path="/rotations" element={<RotationsPage />} />

          <Route path="/archive" element={<TroveArchive />} />
          
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