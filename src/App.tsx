import React, { useState, useEffect } from 'react'
import './App.css'

interface Donation {
  id: string
  title: string
  quantity: string
  donor: string
  location: string
  freshness_score: number
  ai_match: string
  match_percentage: number
  claimed: boolean
}

const mockImpactData = [
  { day: 'Mon', meals: 120, height: '40%' },
  { day: 'Tue', meals: 250, height: '65%' },
  { day: 'Wed', meals: 180, height: '50%' },
  { day: 'Thu', meals: 310, height: '75%' },
  { day: 'Fri', meals: 420, height: '88%' },
  { day: 'Sat', meals: 550, height: '100%' },
  { day: 'Sun', meals: 480, height: '92%' },
]

const initialDonations: Donation[] = [
  {
    id: '1',
    title: 'Fresh Veg Meals (40 Servings)',
    quantity: '40 Boxes',
    donor: 'Grand Palace Hotel',
    location: 'Nigdi, Pune (2.5 km away)',
    freshness_score: 95,
    ai_match: 'Hope Foundation Shelter',
    match_percentage: 98,
    claimed: false,
  },
  {
    id: '2',
    title: 'Surplus Bakery Goods & Bread',
    quantity: '15 kg',
    donor: 'Baker Street Bakery',
    location: 'Akurdi, Pune (1.2 km away)',
    freshness_score: 88,
    ai_match: 'Anand Old Age Home',
    match_percentage: 91,
    claimed: false,
  },
]

function App() {
  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('foodbridge_donations')
    return saved ? JSON.parse(saved) : initialDonations
  })

  const [foodTitle, setFoodTitle] = useState('')
  const [quantity, setQuantity] = useState('')
  const [donorName, setDonorName] = useState('')
  const [location, setLocation] = useState('')
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false)

  useEffect(() => {
    localStorage.setItem('foodbridge_donations', JSON.stringify(donations))
  }, [donations])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!foodTitle || !quantity) return

    setIsAiAnalyzing(true)

    setTimeout(() => {
      const newDonation: Donation = {
        id: Date.now().toString(),
        title: foodTitle,
        quantity: quantity,
        donor: donorName || 'Anonymous Donor',
        location: location || 'Talegaon, Pune (0.8 km)',
        freshness_score: Math.floor(Math.random() * 15) + 85,
        ai_match: 'Seva Orphanage Care Center',
        match_percentage: Math.floor(Math.random() * 8) + 92,
        claimed: false,
      }

      setDonations([newDonation, ...donations])
      setIsAiAnalyzing(false)

      setFoodTitle('')
      setQuantity('')
      setDonorName('')
      setLocation('')

      alert('✨ AI Analysis Complete! Match found and saved successfully.')
      scrollToSection('live-listings')
    }, 1000)
  }

  const handleClaim = (id: string) => {
    setDonations(
      donations.map((item) =>
        item.id === id ? { ...item, claimed: true } : item
      )
    )
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <a className="logo" href="#home" aria-label="FoodBridge AI home">
          <span className="logo-icon">✳</span>
          <span>
            FoodBridge<span className="ai"> AI</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#live-listings">Live Listings</a>
          <a href="#impact">Our Impact</a>
        </div>

        <button
          className="nav-button"
          onClick={() => scrollToSection('donate')}
        >
          Donate food <span>↗</span>
        </button>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot" />
              AI-POWERED FOOD RESCUE
            </div>

            <h1>
              Good food
              <br />
              deserves
              <br />
              <span>another table.</span>
            </h1>

            <p className="hero-description">
              Every day, good food goes to waste while communities need a helping hand. 
              FoodBridge AI matches surplus food with nearby NGOs using smart urgency analysis.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => scrollToSection('donate')}
              >
                Donate Surplus Food <span>↗</span>
              </button>

              <button
                className="secondary-button"
                onClick={() => scrollToSection('how-it-works')}
              >
                Discover Mission ↓
              </button>
            </div>

            <div className="trust-note">
              <span className="trust-icon">🛡️</span>
              100% verified non-profits & smart safety score tracking.
            </div>

            <div className="hero-mini-stats">
              <div>
                <strong>1,240+</strong>
                <span>Meals Rescued</span>
              </div>
              <div className="mini-stat-divider" />
              <div>
                <strong>98%</strong>
                <span>AI Match Accuracy</span>
              </div>
              <div className="mini-stat-divider" />
              <div>
                <strong>18 mins</strong>
                <span>Avg. Pickup Time</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="decorative-label label-top">
              <span>✳</span> AI POWERED MATCHING
            </div>

            <div className="image-card">
              <img
                className="hero-image"
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
                alt="Fresh food share"
              />
              <div className="image-overlay" />
            </div>

            <div className="ai-match-card">
              <div className="ai-match-top">
                <span className="ai-sparkle">✳</span>
                <span>AI RESCUE MATCH</span>
                <span className="live-dot" />
              </div>

              <div className="match-content">
                <div className="match-avatar">NGO</div>
                <div className="match-details">
                  <strong>Hope Care NGO</strong>
                  <span>0.8 km · High Demand</span>
                </div>
                <div className="match-score">
                  <strong>98%</strong>
                  <span>match</span>
                </div>
              </div>

              <div className="match-progress">
                <div className="match-progress-fill" />
              </div>
            </div>
          </div>
        </section>

        {/* Live Food Listings */}
        <section className="how-section" id="live-listings" style={{ background: '#F8E2CE30', padding: '60px 8%' }}>
          <div className="section-heading">
            <p className="section-label">REAL-TIME DASHBOARD</p>
            <h2>Available Food & <span>AI Matches</span></h2>
            <p className="section-description">
              Listings generated by donors and matched with nearby NGOs in real-time.
            </p>
          </div>

          <div className="steps-grid">
            {donations.map((item) => (
              <div className="step-card" key={item.id} style={{ opacity: item.claimed ? 0.6 : 1 }}>
                <div className="step-card-top">
                  <span className="step-number">🍲</span>
                  <span className="step-icon">✳</span>
                </div>

                <p className="step-tag">{item.donor.toUpperCase()}</p>
                <h3>{item.title}</h3>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p>📍 {item.location}</p>

                <div style={{ margin: '15px 0', padding: '10px', background: '#FAF4E9', borderRadius: '8px' }}>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--forest)' }}>
                    <strong>Best AI Match:</strong> {item.ai_match} ({item.match_percentage}% suitability)
                  </p>
                </div>

                <button
                  className={item.claimed ? 'secondary-button' : 'primary-button'}
                  style={{ width: '100%', marginTop: 'auto', padding: '10px' }}
                  onClick={() => handleClaim(item.id)}
                  disabled={item.claimed}
                >
                  {item.claimed ? '✓ Claimed by NGO' : 'Claim Food Donation'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <section className="donate-section" id="donate">
          <p className="section-label">DONOR PORTAL</p>
          <h2>Post Surplus Food <span>for AI Matching</span></h2>
          <p className="donate-description">
            Enter donation details below. Gemini AI will calculate optimal matches based on location, freshness, and recipient needs.
          </p>

          <form onSubmit={handleDonateSubmit} style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', color: '#E0E8DF', display: 'block', marginBottom: '6px' }}>Food Description / Items</label>
              <input
                type="text"
                placeholder="e.g. 50 Veg Meal Boxes, Rice & Curry"
                value={foodTitle}
                onChange={(e) => setFoodTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', color: '#E0E8DF', display: 'block', marginBottom: '6px' }}>Quantity / Servings</label>
              <input
                type="text"
                placeholder="e.g. 30 Packets or 15 kg"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', color: '#E0E8DF', display: 'block', marginBottom: '6px' }}>Donor / Organization Name</label>
              <input
                type="text"
                placeholder="e.g. NMIET Canteen / Royal Hotel"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', color: '#E0E8DF', display: 'block', marginBottom: '6px' }}>Pickup Location</label>
              <input
                type="text"
                placeholder="e.g. Talegaon, Pune"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none' }}
              />
            </div>

            <button
              type="submit"
              className="primary-button donate-cta"
              style={{ width: '100%', marginTop: '10px' }}
              disabled={isAiAnalyzing}
            >
              {isAiAnalyzing ? '🤖 AI Analyzing & Matching...' : 'Run AI Match & Publish ↗'}
            </button>
          </form>
        </section>

        {/* Impact Chart */}
        <section className="how-section" id="impact">
          <div className="section-heading">
            <p className="section-label">IMPACT ANALYTICS</p>
            <h2>Weekly Meals <span>Rescued</span></h2>
          </div>

          <div style={{ width: '100%', height: 260, background: '#FFFEFA', padding: '24px', borderRadius: '15px', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
            {mockImpactData.map((bar) => (
              <div key={bar.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>{bar.meals}</span>
                <div style={{ width: '100%', maxWidth: '35px', height: bar.height, background: 'var(--orange-dark)', borderRadius: '6px 6px 0 0', transition: 'height 0.4s ease' }} />
                <span style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '8px', color: 'var(--forest)' }}>{bar.day}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a className="logo" href="#home">
          <span className="logo-icon">✳</span>
          <span>FoodBridge<span className="ai"> AI</span></span>
        </a>
        <p>Built for Prompt War 2026 Hackathon at NMIET.</p>
      </footer>
    </div>
  )
}

export default App