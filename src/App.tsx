import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home'
import GeneratorsList from './pages/GeneratorsList'
import GeneratorDetail from './pages/GeneratorDetail'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Analytics />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generators" element={<GeneratorsList />} />
            <Route path="/generators/:id" element={<GeneratorDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
