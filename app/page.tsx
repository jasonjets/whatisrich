'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import ParticleBackground from './components/ParticleBackground'

// Data
const analysisData = [
  { icon: '💎', title: 'Material Abundance', keywords: ['money', 'cash', 'wealthy', 'millionaire', 'billionaire', 'buy', 'afford', 'expensive', 'luxury'], text: 'Your answer touches on financial wealth. In our documentary, we explore how material abundance shapes our lives in unexpected ways.' },
  { icon: '❤️', title: 'Human Connection', keywords: ['family', 'friends', 'love', 'people', 'relationship', 'together', 'children', 'partner', 'community'], text: 'Relationships define your richness. Research confirms what you intuitively know: our bonds predict our wellbeing.' },
  { icon: '⏳', title: 'Time & Freedom', keywords: ['time', 'freedom', 'free', 'choice', 'flexible', 'control', 'retire', 'travel', 'independence'], text: 'Time is your true currency. The documentary features voices who traded fortunes for freedom—and never looked back.' },
  { icon: '🌱', title: 'Health & Vitality', keywords: ['health', 'healthy', 'peace', 'mind', 'body', 'energy', 'alive', 'wellness', 'balance'], text: 'Health as wealth—a perspective that crystallizes with age. We met people who lost everything yet felt rich with their health intact.' },
  { icon: '🎯', title: 'Purpose & Meaning', keywords: ['purpose', 'meaning', 'impact', 'help', 'change', 'matter', 'legacy', 'mission', 'difference'], text: 'Purpose is your measure. The film explores how meaning transforms everything—from prison cells to corner offices.' },
  { icon: '✨', title: 'Experience & Growth', keywords: ['experience', 'learn', 'grow', 'adventure', 'memories', 'moments', 'journey', 'discover', 'wisdom'], text: 'You measure wealth in experiences. We followed people who traded possessions for passports and found themselves richer.' },
  { icon: '🙏', title: 'Gratitude & Presence', keywords: ['grateful', 'enough', 'happy', 'content', 'blessed', 'appreciate', 'simple', 'present', 'thankful'], text: 'Contentment is your compass. The documentary reveals how some with the least material wealth exhibit the greatest abundance.' },
  { icon: '🔥', title: 'Passion & Creation', keywords: ['passion', 'create', 'art', 'music', 'build', 'make', 'dream', 'express', 'craft'], text: 'Creative expression defines your richness. We showcase artists who turned away from wealth to pursue their craft.' }
]

const sliderData = [
  { left: 'Security', right: 'Freedom', id: 'security' },
  { left: 'Time', right: 'Money', id: 'time' },
  { left: 'Depth', right: 'Breadth', id: 'depth' },
  { left: 'Stability', right: 'Adventure', id: 'stability' },
  { left: 'Recognition', right: 'Peace', id: 'recognition' }
]

const perspectivesData = [
  { quote: "I had fifty million and felt empty. Now I have enough, and I have everything.", author: "Former Tech CEO", context: "Silicon Valley" },
  { quote: "Rich is watching my grandchildren play in the fields I played in as a child.", author: "Farmer", context: "Rural Japan" },
  { quote: "When you survive what I survived, breathing is rich. Walking is rich.", author: "Refugee", context: "Originally Syria" },
  { quote: "I measure wealth in the number of lives I've changed.", author: "Teacher", context: "Chicago" },
  { quote: "Rich is having options. Not diamonds—options.", author: "Entrepreneur", context: "Lagos, Nigeria" },
  { quote: "True wealth? Not needing to check the price—or the time.", author: "Investor", context: "Monaco" }
]

const profileTypes = [
  { name: 'The Philosopher', subtitle: 'Finding richness in meaning', traits: ['Contemplative', 'Values-led', 'Purpose-driven', 'Reflective'], description: 'You see wealth as a deeper question than numbers in an account. For you, richness is found in the examined life. The documentary will both challenge and affirm your worldview.' },
  { name: 'The Connector', subtitle: 'Finding richness in bonds', traits: ['Heart-centered', 'Empathetic', 'Community-minded', 'Relationship-focused'], description: 'Your wealth is measured in bonds, not stocks. You understand intuitively what research confirms: our relationships are the greatest predictor of wellbeing.' },
  { name: 'The Liberator', subtitle: 'Finding richness in freedom', traits: ['Independence-seeking', 'Time-conscious', 'Choice-driven', 'Boundary-setter'], description: 'Freedom is your currency. The documentary explores how people around the world have traded traditional wealth for something you understand well: liberty.' },
  { name: 'The Builder', subtitle: 'Finding richness in creation', traits: ['Legacy-minded', 'Impact-focused', 'Achievement-oriented', 'Growth-driven'], description: 'You see wealth as what you create, not what you accumulate. Building something meaningful is where you find richness.' },
  { name: 'The Present', subtitle: 'Finding richness in now', traits: ['Moment-focused', 'Gratitude-driven', 'Experience-rich', 'Simplicity-seeking'], description: 'The eternal now is where your wealth lives. While others chase future riches, you find abundance in the present moment.' },
  { name: 'The Balanced', subtitle: 'Finding richness in harmony', traits: ['Holistic', 'Nuanced', 'Multi-dimensional', 'Integrative'], description: 'You resist simple definitions because richness is multifaceted. The documentary speaks to your nuanced view of wealth.' }
]

const suggestions = [
  { answer: "having freedom to spend my time however I want", label: "Freedom & Time" },
  { answer: "being surrounded by people who love me", label: "Love & Family" },
  { answer: "having enough money to never worry", label: "Financial Security" },
  { answer: "good health and peace of mind", label: "Health & Peace" },
  { answer: "doing work that matters and makes a difference", label: "Purpose & Impact" },
  { answer: "experiencing life to the fullest", label: "Experiences & Adventure" },
  { answer: "being content with what I have", label: "Gratitude & Contentment" },
  { answer: "creating something meaningful", label: "Creation & Legacy" },
  { answer: "having options and choices in life", label: "Options & Opportunity" },
  { answer: "independence and not answering to anyone", label: "Independence" },
  { answer: "waking up excited about the day ahead", label: "Joy & Fulfillment" },
  { answer: "being able to help others", label: "Generosity & Giving" }
]

interface AnalysisItem {
  icon: string
  title: string
  text: string
  score?: number
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [exitingScreen, setExitingScreen] = useState<number | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [selectedChip, setSelectedChip] = useState<string | null>(null)
  const [showSubmit, setShowSubmit] = useState(false)
  const [matchedAnalysis, setMatchedAnalysis] = useState<AnalysisItem[]>([])
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    security: 50, time: 50, depth: 50, stability: 50, recognition: 50
  })
  const [currentPerspective, setCurrentPerspective] = useState(0)
  const [exitingPerspective, setExitingPerspective] = useState<number | null>(null)
  const [profile, setProfile] = useState(profileTypes[5])
  const [showShareModal, setShowShareModal] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [visibleSliders, setVisibleSliders] = useState<number[]>([])
  const [visibleTraits, setVisibleTraits] = useState<number[]>([])
  const [introAnimated, setIntroAnimated] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const perspectiveIntervalRef = useRef<NodeJS.Timeout>()
  const activeSliderRef = useRef<string | null>(null)

  // Show screen with exit animation
  const showScreen = useCallback((num: number) => {
    if (num === currentScreen) return
    setExitingScreen(currentScreen)
    setTimeout(() => {
      setCurrentScreen(num)
      setExitingScreen(null)
    }, 500)
  }, [currentScreen])

  // Animate intro on mount
  useEffect(() => {
    const timer = setTimeout(() => setIntroAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Focus input when screen 1 becomes active
  useEffect(() => {
    if (currentScreen === 1) {
      setTimeout(() => inputRef.current?.focus(), 800)
    }
  }, [currentScreen])

  // Animate insight cards
  useEffect(() => {
    if (currentScreen === 2) {
      matchedAnalysis.forEach((_, i) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, i])
        }, 300 + i * 200)
      })
    }
  }, [currentScreen, matchedAnalysis])

  // Animate sliders
  useEffect(() => {
    if (currentScreen === 3) {
      sliderData.forEach((_, i) => {
        setTimeout(() => {
          setVisibleSliders(prev => [...prev, i])
        }, 200 + i * 150)
      })
    }
  }, [currentScreen])

  // Auto-rotate perspectives
  useEffect(() => {
    if (currentScreen === 4) {
      perspectiveIntervalRef.current = setInterval(() => {
        setExitingPerspective(prev => {
          const current = prev ?? currentPerspective
          return current
        })
        setTimeout(() => {
          setCurrentPerspective(prev => (prev + 1) % perspectivesData.length)
          setExitingPerspective(null)
        }, 400)
      }, 5000)
    }
    return () => {
      if (perspectiveIntervalRef.current) {
        clearInterval(perspectiveIntervalRef.current)
      }
    }
  }, [currentScreen, currentPerspective])

  // Generate profile and animate traits
  useEffect(() => {
    if (currentScreen === 5) {
      generateProfile()
    }
  }, [currentScreen, matchedAnalysis, sliderValues])

  const generateProfile = () => {
    let profileIndex = 5

    const timeValue = sliderValues.time || 50
    const securityValue = sliderValues.security || 50
    const recognitionValue = sliderValues.recognition || 50

    if (matchedAnalysis.some(a => a.title.includes('Purpose') || a.title.includes('Creation'))) {
      profileIndex = 3
    } else if (matchedAnalysis.some(a => a.title.includes('Connection'))) {
      profileIndex = 1
    } else if (matchedAnalysis.some(a => a.title.includes('Time') || a.title.includes('Freedom'))) {
      profileIndex = 2
    } else if (matchedAnalysis.some(a => a.title.includes('Gratitude') || a.title.includes('Presence'))) {
      profileIndex = 4
    } else if (securityValue < 30 && recognitionValue > 70) {
      profileIndex = 2
    } else if (timeValue < 30) {
      profileIndex = 4
    } else {
      profileIndex = 0
    }

    setProfile(profileTypes[profileIndex])

    profileTypes[profileIndex].traits.forEach((_, i) => {
      setTimeout(() => {
        setVisibleTraits(prev => [...prev, i])
      }, 300 + i * 100)
    })
  }

  const analyzeAnswer = (answer: string) => {
    const lower = answer.toLowerCase()
    let matched: AnalysisItem[] = []

    analysisData.forEach(item => {
      const matches = item.keywords.filter(k => lower.includes(k)).length
      if (matches > 0) {
        matched.push({ ...item, score: matches })
      }
    })

    matched.sort((a, b) => (b.score || 0) - (a.score || 0))
    matched = matched.slice(0, 3)

    if (matched.length === 0) {
      matched.push({
        icon: '🌟',
        title: 'Unique Vision',
        text: 'Your definition defies easy categorization—which often signals the most profound perspectives. The documentary features voices who share your singular view.'
      })
    }

    setMatchedAnalysis(matched)
  }

  const processAnswer = () => {
    const answer = inputValue.trim()
    if (!answer) return
    setUserAnswer(answer)
    analyzeAnswer(answer)
    setVisibleCards([])
    showScreen(2)
  }

  const handleChipClick = (answer: string) => {
    setSelectedChip(answer)
    setInputValue(answer)
    setShowSubmit(true)
    setTimeout(() => {
      setUserAnswer(answer)
      analyzeAnswer(answer)
      setVisibleCards([])
      showScreen(2)
    }, 400)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setSelectedChip(null)
    setShowSubmit(e.target.value.length > 0)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      processAnswer()
    }
  }

  const showPerspective = (index: number) => {
    if (index === currentPerspective) return
    setExitingPerspective(currentPerspective)
    setTimeout(() => {
      setCurrentPerspective(index)
      setExitingPerspective(null)
    }, 400)
  }

  // Slider handling
  const handleSliderInteraction = useCallback((e: React.MouseEvent | React.TouchEvent, sliderId: string) => {
    const container = (e.target as HTMLElement).closest('.slider-container') as HTMLElement
    if (!container) return

    const updatePosition = (clientX: number) => {
      const rect = container.getBoundingClientRect()
      let percent = ((clientX - rect.left) / rect.width) * 100
      percent = Math.max(0, Math.min(100, percent))
      setSliderValues(prev => ({ ...prev, [sliderId]: Math.round(percent) }))
    }

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    updatePosition(clientX)
    activeSliderRef.current = sliderId

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      if (!activeSliderRef.current) return
      moveEvent.preventDefault()
      const moveClientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX
      updatePosition(moveClientX)
    }

    const handleEnd = () => {
      activeSliderRef.current = null
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchend', handleEnd)
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('touchmove', handleMove, { passive: false })
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchend', handleEnd)
  }, [])

  const getSliderLabel = (id: string, value: number, left: string, right: string) => {
    if (value < 35) return `Leaning ${left.toLowerCase()}`
    if (value > 65) return `Leaning ${right.toLowerCase()}`
    return 'Balanced'
  }

  const progress = (currentScreen / 6) * 100

  return (
    <>
      <ParticleBackground />

      {/* Progress Line */}
      <div className="progress-line" style={{ width: `${progress}%` }} />

      {/* Navigation */}
      <nav className="nav-indicator">
        {['Begin', 'Define', 'Reflect', 'Explore', 'Discover', 'Profile', 'Continue'].map((label, i) => (
          <button
            key={i}
            className={`nav-dot ${i === currentScreen ? 'active' : ''} ${i < currentScreen ? 'completed' : ''}`}
            data-label={label}
            onClick={() => {
              if (i <= currentScreen || (i === currentScreen + 1 && (currentScreen === 0 || userAnswer))) {
                showScreen(i)
              }
            }}
          />
        ))}
      </nav>

      {/* SCREEN 0: INTRO */}
      <div
        className={`screen screen-intro ${currentScreen === 0 ? 'active' : ''} ${exitingScreen === 0 ? 'exit' : ''}`}
        onClick={() => currentScreen === 0 && showScreen(1)}
      >
        <div className="intro-content">
          <h1 className={`intro-question ${introAnimated ? 'visible' : ''}`}>
            {introAnimated ? (
              <>
                {'What Is '.split('').map((char, i) => (
                  <span key={i} className="char" style={{ animationDelay: `${0.5 + i * 0.05}s` }}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                <span className="highlight">
                  {'Rich'.split('').map((char, i) => (
                    <span key={i} className="char" style={{ animationDelay: `${0.5 + (8 + i) * 0.05}s` }}>
                      {char}
                    </span>
                  ))}
                </span>
                {'?'.split('').map((char, i) => (
                  <span key={i} className="char" style={{ animationDelay: `${0.5 + (12 + i) * 0.05}s` }}>
                    {char}
                  </span>
                ))}
              </>
            ) : 'What Is Rich?'}
          </h1>
        </div>
        <div className="intro-tap">Tap to begin</div>
        <div className="intro-line" />
      </div>

      {/* SCREEN 1: INPUT */}
      <div className={`screen screen-input ${currentScreen === 1 ? 'active' : ''} ${exitingScreen === 1 ? 'exit' : ''}`}>
        <div className="input-wrapper">
          <p className="input-prompt">To you, what does <span>rich</span> mean?</p>
          <input
            ref={inputRef}
            type="text"
            className="the-input"
            placeholder="Type your answer..."
            maxLength={80}
            autoComplete="off"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <p className="input-hint">Type your own or choose below</p>

          <p className="suggestions-label">Or select a perspective</p>
          <div className="suggestion-chips">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className={`suggestion-chip ${selectedChip === s.answer ? 'selected' : ''}`}
                onClick={() => handleChipClick(s.answer)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="or-divider">or type your own above</div>

          <div className={`submit-container ${showSubmit ? 'visible' : ''}`}>
            <button className="submit-btn" onClick={processAnswer}>
              Reveal My Rich
            </button>
          </div>
        </div>
      </div>

      {/* SCREEN 2: REVEAL */}
      <div className={`screen screen-reveal ${currentScreen === 2 ? 'active' : ''} ${exitingScreen === 2 ? 'exit' : ''}`}>
        <div className="reveal-wrapper">
          <div className="your-answer-section">
            <p className="your-label">You said rich is</p>
            <h2 className="your-answer-display">&ldquo;{userAnswer}&rdquo;</h2>
          </div>

          <div className="insight-cards">
            {matchedAnalysis.map((item, i) => (
              <div key={i} className={`insight-card ${visibleCards.includes(i) ? 'visible' : ''}`}>
                <div className="insight-icon">{item.icon}</div>
                <h3 className="insight-title">{item.title}</h3>
                <p className="insight-text">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="reveal-message">
            <p>
              When you say rich is &ldquo;{userAnswer}&rdquo;, you join a conversation spanning centuries.
              In <em>What Is Rich?</em>, we asked this question across 12 countries—billionaires and monks,
              CEOs and children. What we found will resonate with your answer.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="continue-btn" onClick={() => showScreen(3)}>
              Go Deeper →
            </button>
          </div>
        </div>
      </div>

      {/* SCREEN 3: SPECTRUM */}
      <div className={`screen screen-spectrum ${currentScreen === 3 ? 'active' : ''} ${exitingScreen === 3 ? 'exit' : ''}`}>
        <div className="spectrum-wrapper">
          <div className="spectrum-header">
            <h2 className="spectrum-title">The Dimensions of <span style={{ color: 'var(--gold)' }}>Rich</span></h2>
            <p className="spectrum-subtitle">Drag the handles to explore what matters most to you</p>
          </div>

          <div className="sliders-wrapper">
            {sliderData.map((s, i) => (
              <div key={s.id} className={`slider-section ${visibleSliders.includes(i) ? 'visible' : ''}`}>
                <div className="slider-header">
                  <span className="slider-label">{s.left}</span>
                  <span className="slider-label">{s.right}</span>
                </div>
                <div
                  className="slider-container"
                  onMouseDown={(e) => handleSliderInteraction(e, s.id)}
                  onTouchStart={(e) => handleSliderInteraction(e, s.id)}
                >
                  <div className="slider-track" />
                  <div className="slider-fill" style={{ width: `${sliderValues[s.id]}%` }} />
                  <div
                    className={`slider-handle ${activeSliderRef.current === s.id ? 'dragging' : ''}`}
                    style={{ left: `${sliderValues[s.id]}%` }}
                  />
                </div>
                <div className="slider-value-label">
                  {getSliderLabel(s.id, sliderValues[s.id], s.left, s.right)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem', paddingBottom: '2rem' }}>
            <button className="continue-btn" onClick={() => showScreen(4)}>
              See Perspectives →
            </button>
          </div>
        </div>
      </div>

      {/* SCREEN 4: PERSPECTIVES */}
      <div className={`screen screen-perspectives ${currentScreen === 4 ? 'active' : ''} ${exitingScreen === 4 ? 'exit' : ''}`}>
        <div className="perspectives-wrapper">
          <h2 className="perspectives-title">Voices on <span style={{ color: 'var(--gold)' }}>Rich</span></h2>

          <div className="perspective-stage">
            {perspectivesData.map((p, i) => (
              <div
                key={i}
                className={`perspective-item ${i === currentPerspective ? 'active' : ''} ${i === exitingPerspective ? 'exit' : ''}`}
              >
                <p className="perspective-quote">{p.quote}</p>
                <p className="perspective-author">{p.author}</p>
                <p className="perspective-context">{p.context}</p>
              </div>
            ))}
          </div>

          <div className="perspective-nav">
            {perspectivesData.map((_, i) => (
              <button
                key={i}
                className={`perspective-dot ${i === currentPerspective ? 'active' : ''}`}
                onClick={() => showPerspective(i)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="continue-btn" onClick={() => { setVisibleTraits([]); showScreen(5) }}>
              See Your Profile →
            </button>
          </div>
        </div>
      </div>

      {/* SCREEN 5: PROFILE */}
      <div className={`screen screen-profile ${currentScreen === 5 ? 'active' : ''} ${exitingScreen === 5 ? 'exit' : ''}`}>
        <div className="profile-wrapper">
          <div className="profile-header">
            <h2 className="profile-title">Your Wealth <span style={{ color: 'var(--gold)' }}>Archetype</span></h2>
          </div>

          <div className="profile-visual">
            <div className="profile-orbit"><div className="profile-orbit-dot" /></div>
            <div className="profile-orbit"><div className="profile-orbit-dot" /></div>
            <div className="profile-orbit"><div className="profile-orbit-dot" /></div>
            <div className="profile-center">
              <div className="profile-type-name">{profile.name}</div>
              <div className="profile-type-subtitle">{profile.subtitle}</div>
            </div>
          </div>

          <div className="profile-traits">
            {profile.traits.map((trait, i) => (
              <span key={i} className={`trait-tag ${visibleTraits.includes(i) ? 'visible' : ''}`}>
                {trait}
              </span>
            ))}
          </div>

          <div className="profile-description">
            <p>{profile.description}</p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="continue-btn" onClick={() => showScreen(6)}>
              Complete Journey →
            </button>
          </div>
        </div>
      </div>

      {/* SCREEN 6: CTA */}
      <div className={`screen screen-cta ${currentScreen === 6 ? 'active' : ''} ${exitingScreen === 6 ? 'exit' : ''}`}>
        <div className="cta-wrapper">
          <h2 className="cta-title">The Film Awaits</h2>
          <p className="cta-subtitle">
            You&apos;ve glimpsed your definition of rich. Now discover how people across the world answer the same question.
          </p>

          <div className="cta-buttons">
            <a href="https://www.whatisrichdoc.com/" className="cta-primary">
              Explore the Documentary
            </a>
            <button className="cta-secondary" onClick={() => setShowShareModal(true)}>
              Share My Definition
            </button>
          </div>

          <div className="cta-links">
            <a href="https://www.whatisrichdoc.com/" className="cta-link">Official Site</a>
            <a href="#" className="cta-link">Instagram</a>
            <a href="#" className="cta-link">Twitter</a>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      <div
        className={`share-modal ${showShareModal ? 'active' : ''}`}
        onClick={(e) => e.target === e.currentTarget && setShowShareModal(false)}
      >
        <div className="share-content">
          <h3 className="share-title">Share Your Rich</h3>
          <div className="share-card">
            <p className="share-card-text">&ldquo;Rich is {userAnswer}&rdquo;</p>
          </div>
          <div className="share-buttons">
            <button className="share-btn">𝕏</button>
            <button className="share-btn">f</button>
            <button className="share-btn">in</button>
            <button className="share-btn">📋</button>
          </div>
          <button className="close-share" onClick={() => setShowShareModal(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  )
}
