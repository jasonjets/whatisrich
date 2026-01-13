'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import ParticleBackground from './components/ParticleBackground'

// Data
const analysisData = [
  { icon: '💎', title: 'Material Abundance', keywords: ['money', 'cash', 'wealthy', 'millionaire', 'billionaire', 'buy', 'afford', 'expensive', 'luxury'], text: 'Your answer touches on financial wealth. In our docuseries, we explore how material abundance shapes our lives in unexpected ways.' },
  { icon: '❤️', title: 'Human Connection', keywords: ['family', 'friends', 'love', 'people', 'relationship', 'together', 'children', 'partner', 'community'], text: 'Relationships define your richness. Research confirms what you intuitively know: our bonds predict our wellbeing.' },
  { icon: '⏳', title: 'Time & Freedom', keywords: ['time', 'freedom', 'free', 'choice', 'flexible', 'control', 'retire', 'travel', 'independence'], text: 'Time is your true currency. The docuseries features voices who traded fortunes for freedom—and never looked back.' },
  { icon: '🌱', title: 'Health & Vitality', keywords: ['health', 'healthy', 'peace', 'mind', 'body', 'energy', 'alive', 'wellness', 'balance'], text: 'Health as wealth—a perspective that crystallizes with age. We met people who lost everything yet felt rich with their health intact.' },
  { icon: '🎯', title: 'Purpose & Meaning', keywords: ['purpose', 'meaning', 'impact', 'help', 'change', 'matter', 'legacy', 'mission', 'difference'], text: 'Purpose is your measure. The docuseries explores how meaning transforms everything—from prison cells to corner offices.' },
  { icon: '✨', title: 'Experience & Growth', keywords: ['experience', 'learn', 'grow', 'adventure', 'memories', 'moments', 'journey', 'discover', 'wisdom'], text: 'You measure wealth in experiences. We followed people who traded possessions for passports and found themselves richer.' },
  { icon: '🙏', title: 'Gratitude & Presence', keywords: ['grateful', 'enough', 'happy', 'content', 'blessed', 'appreciate', 'simple', 'present', 'thankful'], text: 'Contentment is your compass. The docuseries reveals how some with the least material wealth exhibit the greatest abundance.' },
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
  {
    name: 'The Time Billionaire',
    subtitle: 'Time is the only real flex',
    traits: ['Hates being rushed', 'Optimizes life, not just money', 'Time-conscious', 'Freedom-focused'],
    description: 'You understand that time is the ultimate currency. While others chase money, you\'ve optimized your life to maximize freedom and minimize obligations. The docuseries explores how people around the world have traded traditional wealth for something you understand well: the luxury of time.',
    shareLine: "I'm rich in time."
  },
  {
    name: 'The Asset Alchemist',
    subtitle: 'Turns effort into ownership',
    traits: ['Sees assets everywhere', 'Thinks in leverage, not labor', 'Builds systems', 'Ownership-minded'],
    description: 'You see opportunities to convert work into lasting value. Where others see jobs, you see assets. You think in systems, leverage, and ownership—turning every effort into something that works for you long-term.',
    shareLine: 'I turn work into wealth.'
  },
  {
    name: 'The Plug',
    subtitle: 'Access beats money',
    traits: ['Always knows who to call', 'Power through relationships', 'Network-focused', 'Connection-driven'],
    description: 'Your wealth lives in your relationships. You understand that the right connection at the right time is worth more than any amount of money. Your network isn\'t just contacts—it\'s your infrastructure.',
    shareLine: 'My network is my net worth.'
  },
  {
    name: 'The Firewall',
    subtitle: 'Wealth protects peace',
    traits: ['Low drama, high margin', 'Emergency-ready', 'Stress-resistant', 'Security-focused'],
    description: 'You\'ve built wealth as a buffer against chaos. Financial security isn\'t about showing off—it\'s about creating a life where emergencies can\'t touch your peace. You sleep well because you\'re prepared.',
    shareLine: 'Nothing can touch my peace.'
  },
  {
    name: 'The Visionary',
    subtitle: 'Wealth is seeing first',
    traits: ['Early mover', 'Invests before it\'s obvious', 'Forward-thinking', 'Trend-spotting'],
    description: 'You see value before others do. While the crowd follows trends, you\'re already moving to the next opportunity. Your wealth comes from recognizing patterns, timing, and potential that others miss.',
    shareLine: 'I see it before it\'s valuable.'
  },
  {
    name: 'The Pillar',
    subtitle: 'Others depend on me',
    traits: ['Family anchor', 'Team foundation', 'Community support', 'Responsibility-driven'],
    description: 'Your wealth is measured by the people who count on you. You build not just for yourself, but as the foundation others can stand on. Being reliable, stable, and dependable is your form of richness.',
    shareLine: 'I\'m the foundation.'
  },
  {
    name: 'The Catalyst',
    subtitle: 'Money accelerates change',
    traits: ['Funds ideas', 'Supports people', 'Drives movements', 'Momentum-focused'],
    description: 'You use wealth as fuel for transformation. Money isn\'t the goal—it\'s the tool that lets you fund ideas, support people, and drive movements. You thrive on momentum and making things happen.',
    shareLine: 'I make things happen.'
  },
  {
    name: 'The Aesthetic',
    subtitle: 'Wealth should look and feel good',
    traits: ['Design-focused', 'Lifestyle-driven', 'Experience-rich', 'Expressive'],
    description: 'You believe wealth should be beautiful. It\'s not shallow—it\'s expressive. You invest in design, experiences, and lifestyle because how your life looks and feels matters. Your environment reflects your values.',
    shareLine: 'My life reflects my taste.'
  }
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
  const [profile, setProfile] = useState(profileTypes[0])
  const [showShareModal, setShowShareModal] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [visibleSliders, setVisibleSliders] = useState<number[]>([])
  const [visibleTraits, setVisibleTraits] = useState<number[]>([])
  const [introAnimated, setIntroAnimated] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const perspectiveIntervalRef = useRef<NodeJS.Timeout>()
  const activeSliderRef = useRef<string | null>(null)
  const isTransitioningRef = useRef(false)

  // Show screen with exit animation
  const showScreen = useCallback((num: number) => {
    if (num === currentScreen || isTransitioningRef.current) return
    isTransitioningRef.current = true
    setExitingScreen(currentScreen)
    setTimeout(() => {
      setCurrentScreen(num)
      setExitingScreen(null)
      isTransitioningRef.current = false
    }, 500)
  }, [currentScreen])

  // Handle intro click/touch - works on any element within the intro screen
  const handleIntroClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (currentScreen === 0 && !isTransitioningRef.current) {
      e.preventDefault()
      e.stopPropagation()
      showScreen(1)
    }
  }, [currentScreen, showScreen])

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
    let profileIndex = 0

    const timeValue = sliderValues.time || 50
    const securityValue = sliderValues.security || 50
    const recognitionValue = sliderValues.recognition || 50
    const depthValue = sliderValues.depth || 50
    const stabilityValue = sliderValues.stability || 50

    // Use the PRIMARY (highest-scoring) matched analysis to determine archetype
    const primaryMatch = matchedAnalysis[0]?.title || ''

    // Map primary analysis to archetype
    if (primaryMatch.includes('Time') || primaryMatch.includes('Freedom')) {
      profileIndex = 0 // The Time Billionaire
    } else if (primaryMatch.includes('Material') || primaryMatch.includes('Abundance')) {
      profileIndex = 1 // The Asset Alchemist
    } else if (primaryMatch.includes('Connection')) {
      profileIndex = 2 // The Plug
    } else if (primaryMatch.includes('Health') || primaryMatch.includes('Vitality')) {
      profileIndex = 3 // The Firewall
    } else if (primaryMatch.includes('Experience') || primaryMatch.includes('Growth')) {
      profileIndex = 4 // The Visionary
    } else if (primaryMatch.includes('Purpose') || primaryMatch.includes('Meaning')) {
      profileIndex = 5 // The Pillar
    } else if (primaryMatch.includes('Passion') || primaryMatch.includes('Creation')) {
      profileIndex = 6 // The Catalyst
    } else if (primaryMatch.includes('Gratitude') || primaryMatch.includes('Presence')) {
      profileIndex = 7 // The Aesthetic
    } else {
      // Fallback based on slider values when no clear match
      if (timeValue > 60 && timeValue > securityValue) {
        profileIndex = 0 // The Time Billionaire
      } else if (securityValue > 60) {
        profileIndex = 3 // The Firewall
      } else if (stabilityValue < 40) {
        profileIndex = 4 // The Visionary (adventure-leaning)
      } else if (recognitionValue > 60) {
        profileIndex = 6 // The Catalyst
      } else if (depthValue > 60) {
        profileIndex = 2 // The Plug (depth in relationships)
      } else {
        profileIndex = 5 // The Pillar (balanced default)
      }
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
        text: 'Your definition defies easy categorization—which often signals the most profound perspectives. The docuseries features voices who share your singular view.'
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
        onClick={handleIntroClick}
        onTouchStart={handleIntroClick}
        style={{ 
          cursor: currentScreen === 0 ? 'pointer' : 'default',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10
        }}
      >
        <div className="cinematic-intro" onClick={handleIntroClick} onTouchStart={handleIntroClick} style={{ pointerEvents: 'auto' }}>
          {/* Main Title - Centered & Dominant */}
          <div 
            className={`main-title-hero ${introAnimated ? 'visible' : ''}`} 
            onClick={handleIntroClick} 
            onTouchStart={handleIntroClick}
          >
            <h1 className="hero-title" onClick={handleIntroClick} onTouchStart={handleIntroClick}>WHAT IS RICH?</h1>
            <div className="title-underline"></div>
            
            {/* Call to Action directly under title */}
            <div className={`cinematic-cta-inline ${introAnimated ? 'visible' : ''}`}>
              <div className="cta-pulse"></div>
              <div className="cta-text">TAP TO BEGIN</div>
            </div>
          </div>

          {/* Names Only - Bottom */}
          <div className={`producer-credits-bottom ${introAnimated ? 'visible' : ''}`}>
            <div className="credit-line" style={{ 
              fontSize: '0.65rem', 
              letterSpacing: '0.15em',
              marginBottom: '1.5rem',
              opacity: 0.7,
              fontWeight: '300',
              textTransform: 'uppercase'
            }}>
              A docuseries redefining wealth, ownership, and the American dream
            </div>
            <div className="credit-line" style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>RUSHION MCDONALD</div>
            <div className="credit-line" style={{ fontSize: '1.1rem', fontWeight: '500' }}>JEROME LOVE</div>
          </div>
        </div>
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
          <h2 className="cta-title">The Docuseries Awaits</h2>
          <p className="cta-subtitle">
            You&apos;ve glimpsed your definition of rich. Now discover how people across the world answer the same question.
          </p>

          <div className="cta-buttons">
            <a href="https://www.whatisrichdoc.com/" className="cta-primary">
              Explore the Docuseries
            </a>
            <button className="cta-secondary" onClick={() => setShowShareModal(true)}>
              Share My Definition
            </button>
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
            <p className="share-card-text">&ldquo;{profile.shareLine}&rdquo;</p>
          </div>
          <div className="share-buttons">
            <button
              className="share-btn"
              id="shareInstagram"
              title="Share on Instagram"
              onClick={() => {
                const shareText = `${profile.shareLine}\n\nExplore more: ${window.location.href}`
                navigator.clipboard.writeText(shareText).then(() => {
                  alert('Copied to clipboard! Paste it in your Instagram post.')
                }).catch(() => {
                  const textarea = document.createElement('textarea')
                  textarea.value = shareText
                  document.body.appendChild(textarea)
                  textarea.select()
                  document.execCommand('copy')
                  document.body.removeChild(textarea)
                  alert('Copied to clipboard! Paste it in your Instagram post.')
                })
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
            <button
              className="share-btn"
              id="shareFacebook"
              title="Share on Facebook"
              onClick={() => {
                const shareUrl = window.location.href
                const fullText = `${profile.shareLine} - What Is Rich?`
                const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(fullText)}`
                window.open(url, '_blank', 'width=600,height=400')
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button
              className="share-btn"
              id="shareTikTok"
              title="Share on TikTok"
              onClick={() => {
                const shareText = `${profile.shareLine}\n\nExplore more: ${window.location.href}`
                navigator.clipboard.writeText(shareText).then(() => {
                  alert('Copied to clipboard! Paste it in your TikTok video description.')
                }).catch(() => {
                  const textarea = document.createElement('textarea')
                  textarea.value = shareText
                  document.body.appendChild(textarea)
                  textarea.select()
                  document.execCommand('copy')
                  document.body.removeChild(textarea)
                  alert('Copied to clipboard! Paste it in your TikTok video description.')
                })
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </button>
            <button
              className="share-btn"
              id="shareLinkedIn"
              title="Share on LinkedIn"
              onClick={() => {
                const shareUrl = window.location.href
                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
                window.open(url, '_blank', 'width=600,height=400')
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
            <button
              className="share-btn"
              id="shareX"
              title="Share on X"
              onClick={() => {
                const shareUrl = window.location.href
                const fullText = `${profile.shareLine} - What Is Rich?`
                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}&url=${encodeURIComponent(shareUrl)}`
                window.open(url, '_blank', 'width=600,height=400')
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
          </div>
          <button className="close-share" onClick={() => setShowShareModal(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  )
}
