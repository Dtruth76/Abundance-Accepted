import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import LoopDivider from './components/LoopDivider'
import Approach from './components/Approach'
import About from './components/About'
import Books from './components/Books'
import BioFit from './components/BioFit'
import AdSlot from './components/AdSlot'
import Membership from './components/Membership'
import AffiliateShop from './components/AffiliateShop'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import CheckoutSuccess from './pages/CheckoutSuccess'
import CheckoutCancelled from './pages/CheckoutCancelled'

function HomePage() {
  return (
    <div className="min-h-screen bg-parchment">
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <LoopDivider tone="gold" />
        <Approach />
        <About />
        <Books />
        <BioFit />
        <div className="bg-parchment py-16">
          <AdSlot />
        </div>
        <Membership />
        <AffiliateShop />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/checkout-cancelled" element={<CheckoutCancelled />} />
    </Routes>
  )
}
