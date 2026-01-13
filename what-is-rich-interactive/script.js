// ==========================================
// WEBGL PARTICLE BACKGROUND
// ==========================================
const canvas = document.getElementById('webgl-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const count = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000));

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
            golden: Math.random() > 0.85
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Smooth mouse following
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    particles.forEach((p, i) => {
        // Mouse influence
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
            const force = (200 - dist) / 200;
            p.vx -= (dx / dist) * force * 0.02;
            p.vy -= (dy / dist) * force * 0.02;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.golden) {
            ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.5})`;
        }
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx2 = p.x - p2.x;
            const dy2 = p.y - p2.y;
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            if (dist2 < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                const lineAlpha = (1 - dist2 / 120) * 0.15;
                if (p.golden || p2.golden) {
                    ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
                } else {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha * 0.5})`;
                }
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

document.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
});

resizeCanvas();
createParticles();
animateParticles();

// ==========================================
// DATA
// ==========================================
const analysisData = [
    { icon: '💎', title: 'Material Abundance', keywords: ['money', 'cash', 'wealthy', 'millionaire', 'billionaire', 'buy', 'afford', 'expensive', 'luxury'], text: 'Your answer touches on financial wealth. In our documentary, we explore how material abundance shapes our lives in unexpected ways.' },
    { icon: '❤️', title: 'Human Connection', keywords: ['family', 'friends', 'love', 'people', 'relationship', 'together', 'children', 'partner', 'community'], text: 'Relationships define your richness. Research confirms what you intuitively know: our bonds predict our wellbeing.' },
    { icon: '⏳', title: 'Time & Freedom', keywords: ['time', 'freedom', 'free', 'choice', 'flexible', 'control', 'retire', 'travel', 'independence'], text: 'Time is your true currency. The documentary features voices who traded fortunes for freedom—and never looked back.' },
    { icon: '🌱', title: 'Health & Vitality', keywords: ['health', 'healthy', 'peace', 'mind', 'body', 'energy', 'alive', 'wellness', 'balance'], text: 'Health as wealth—a perspective that crystallizes with age. We met people who lost everything yet felt rich with their health intact.' },
    { icon: '🎯', title: 'Purpose & Meaning', keywords: ['purpose', 'meaning', 'impact', 'help', 'change', 'matter', 'legacy', 'mission', 'difference'], text: 'Purpose is your measure. The film explores how meaning transforms everything—from prison cells to corner offices.' },
    { icon: '✨', title: 'Experience & Growth', keywords: ['experience', 'learn', 'grow', 'adventure', 'memories', 'moments', 'journey', 'discover', 'wisdom'], text: 'You measure wealth in experiences. We followed people who traded possessions for passports and found themselves richer.' },
    { icon: '🙏', title: 'Gratitude & Presence', keywords: ['grateful', 'enough', 'happy', 'content', 'blessed', 'appreciate', 'simple', 'present', 'thankful'], text: 'Contentment is your compass. The documentary reveals how some with the least material wealth exhibit the greatest abundance.' },
    { icon: '🔥', title: 'Passion & Creation', keywords: ['passion', 'create', 'art', 'music', 'build', 'make', 'dream', 'express', 'craft'], text: 'Creative expression defines your richness. We showcase artists who turned away from wealth to pursue their craft.' }
];

const sliderData = [
    { left: 'Security', right: 'Freedom', id: 'security' },
    { left: 'Time', right: 'Money', id: 'time' },
    { left: 'Depth', right: 'Breadth', id: 'depth' },
    { left: 'Stability', right: 'Adventure', id: 'stability' },
    { left: 'Recognition', right: 'Peace', id: 'recognition' }
];

const perspectivesData = [
    { quote: "I had fifty million and felt empty. Now I have enough, and I have everything.", author: "Former Tech CEO", context: "Silicon Valley" },
    { quote: "Rich is watching my grandchildren play in the fields I played in as a child.", author: "Farmer", context: "Rural Japan" },
    { quote: "When you survive what I survived, breathing is rich. Walking is rich.", author: "Refugee", context: "Originally Syria" },
    { quote: "I measure wealth in the number of lives I've changed.", author: "Teacher", context: "Chicago" },
    { quote: "Rich is having options. Not diamonds—options.", author: "Entrepreneur", context: "Lagos, Nigeria" },
    { quote: "True wealth? Not needing to check the price—or the time.", author: "Investor", context: "Monaco" }
];

const profileTypes = [
    { name: 'The Philosopher', subtitle: 'Finding richness in meaning', traits: ['Contemplative', 'Values-led', 'Purpose-driven', 'Reflective'], description: 'You see wealth as a deeper question than numbers in an account. For you, richness is found in the examined life. The documentary will both challenge and affirm your worldview.' },
    { name: 'The Connector', subtitle: 'Finding richness in bonds', traits: ['Heart-centered', 'Empathetic', 'Community-minded', 'Relationship-focused'], description: 'Your wealth is measured in bonds, not stocks. You understand intuitively what research confirms: our relationships are the greatest predictor of wellbeing.' },
    { name: 'The Liberator', subtitle: 'Finding richness in freedom', traits: ['Independence-seeking', 'Time-conscious', 'Choice-driven', 'Boundary-setter'], description: 'Freedom is your currency. The documentary explores how people around the world have traded traditional wealth for something you understand well: liberty.' },
    { name: 'The Builder', subtitle: 'Finding richness in creation', traits: ['Legacy-minded', 'Impact-focused', 'Achievement-oriented', 'Growth-driven'], description: 'You see wealth as what you create, not what you accumulate. Building something meaningful is where you find richness.' },
    { name: 'The Present', subtitle: 'Finding richness in now', traits: ['Moment-focused', 'Gratitude-driven', 'Experience-rich', 'Simplicity-seeking'], description: 'The eternal now is where your wealth lives. While others chase future riches, you find abundance in the present moment.' },
    { name: 'The Balanced', subtitle: 'Finding richness in harmony', traits: ['Holistic', 'Nuanced', 'Multi-dimensional', 'Integrative'], description: 'You resist simple definitions because richness is multifaceted. The documentary speaks to your nuanced view of wealth.' }
];

// ==========================================
// STATE
// ==========================================
let currentScreen = 0;
let userAnswer = '';
let sliderValues = {};
let matchedAnalysis = [];
let currentPerspective = 0;
let perspectiveInterval;

// ==========================================
// SCREEN MANAGEMENT
// ==========================================
function showScreen(num) {
    const current = document.querySelector('.screen.active');
    const next = document.getElementById(`screen-${num}`);

    if (current && current !== next) {
        current.classList.add('exit');
        setTimeout(() => {
            current.classList.remove('active', 'exit');
        }, 1000);
    }

    setTimeout(() => {
        next.classList.add('active');
        currentScreen = num;
        updateProgress();
        updateNav();

        // Screen-specific animations
        if (num === 1) focusInput();
        if (num === 2) animateInsightCards();
        if (num === 3) animateSliders();
        if (num === 4) startPerspectives();
        if (num === 5) animateProfile();
    }, current ? 500 : 0);
}

function updateProgress() {
    const progress = (currentScreen / 6) * 100;
    document.getElementById('progressLine').style.width = `${progress}%`;
}

function updateNav() {
    document.querySelectorAll('.nav-dot').forEach((dot, i) => {
        dot.classList.remove('active', 'completed');
        if (i === currentScreen) dot.classList.add('active');
        if (i < currentScreen) dot.classList.add('completed');
    });
}

// ==========================================
// INTRO ANIMATION
// ==========================================
function animateIntro() {
    const question = document.getElementById('introQuestion');
    const text = question.innerHTML;

    let html = '';
    let charIndex = 0;
    const words = text.split(/(<span[^>]*>.*?<\/span>|[^<\s]+|\s)/g).filter(Boolean);

    words.forEach(word => {
        if (word.includes('<span')) {
            const inner = word.match(/>([^<]+)</)[1];
            const before = word.split('>')[0] + '>';
            const after = '</span>';
            html += before;
            inner.split('').forEach(char => {
                html += `<span class="char" style="animation-delay:${0.5 + charIndex * 0.05}s">${char}</span>`;
                charIndex++;
            });
            html += after;
        } else if (word === ' ') {
            html += ' ';
        } else {
            word.split('').forEach(char => {
                html += `<span class="char" style="animation-delay:${0.5 + charIndex * 0.05}s">${char}</span>`;
                charIndex++;
            });
        }
    });

    question.innerHTML = html;
    question.style.opacity = '1';
}

// ==========================================
// INPUT HANDLING
// ==========================================
function setupInput() {
    const input = document.getElementById('userInput');
    const submitContainer = document.getElementById('submitContainer');
    const chips = document.querySelectorAll('.suggestion-chip');
    let selectedChip = null;

    // Input typing
    input.addEventListener('input', () => {
        // Clear any selected chip when typing
        if (selectedChip) {
            selectedChip.classList.remove('selected');
            selectedChip = null;
        }
        if (input.value.length > 0) {
            submitContainer.classList.add('visible');
        } else {
            submitContainer.classList.remove('visible');
        }
    });

    // Focus input - make it more clickable
    input.addEventListener('click', () => {
        input.focus();
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            processAnswer();
        }
    });

    // Suggestion chips
    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Deselect previous
            if (selectedChip) {
                selectedChip.classList.remove('selected');
            }

            // Select this one
            chip.classList.add('selected');
            selectedChip = chip;

            // Set input value
            input.value = chip.dataset.answer;
            submitContainer.classList.add('visible');

            // Auto-submit after brief delay for visual feedback
            setTimeout(() => {
                processAnswer();
            }, 400);
        });
    });

    document.getElementById('submitBtn').addEventListener('click', () => {
        if (input.value.trim()) processAnswer();
    });
}

function focusInput() {
    setTimeout(() => {
        const input = document.getElementById('userInput');
        if (input) {
            input.focus();
        }
    }, 800);
}

function processAnswer() {
    userAnswer = document.getElementById('userInput').value.trim();
    if (!userAnswer) return;
    analyzeAnswer();
    showScreen(2);
}

function analyzeAnswer() {
    const lower = userAnswer.toLowerCase();
    matchedAnalysis = [];

    analysisData.forEach(item => {
        const matches = item.keywords.filter(k => lower.includes(k)).length;
        if (matches > 0) {
            matchedAnalysis.push({ ...item, score: matches });
        }
    });

    matchedAnalysis.sort((a, b) => b.score - a.score);
    matchedAnalysis = matchedAnalysis.slice(0, 3);

    if (matchedAnalysis.length === 0) {
        matchedAnalysis.push({
            icon: '🌟',
            title: 'Unique Vision',
            text: 'Your definition defies easy categorization—which often signals the most profound perspectives. The documentary features voices who share your singular view.'
        });
    }

    // Populate reveal screen
    document.getElementById('answerDisplay').textContent = `"${userAnswer}"`;

    const cardsContainer = document.getElementById('insightCards');
    cardsContainer.innerHTML = matchedAnalysis.map(item => `
        <div class="insight-card">
            <div class="insight-icon">${item.icon}</div>
            <h3 class="insight-title">${item.title}</h3>
            <p class="insight-text">${item.text}</p>
        </div>
    `).join('');

    document.getElementById('revealMessage').innerHTML = `
        <p>When you say rich is "${userAnswer}", you join a conversation spanning centuries. In <em>What Is Rich?</em>, we asked this question across 12 countries—billionaires and monks, CEOs and children. What we found will resonate with your answer.</p>
    `;
}

function animateInsightCards() {
    document.querySelectorAll('.insight-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), 300 + i * 200);
    });
}

// ==========================================
// SLIDERS
// ==========================================
let activeSlider = null;

function setupSliders() {
    const wrapper = document.getElementById('slidersWrapper');

    sliderData.forEach(s => {
        sliderValues[s.id] = 50;

        const section = document.createElement('div');
        section.className = 'slider-section';
        section.innerHTML = `
            <div class="slider-header">
                <span class="slider-label">${s.left}</span>
                <span class="slider-label">${s.right}</span>
            </div>
            <div class="slider-container" data-id="${s.id}" data-left="${s.left}" data-right="${s.right}">
                <div class="slider-track"></div>
                <div class="slider-fill" style="width: 50%"></div>
                <div class="slider-handle" style="left: 50%"></div>
            </div>
            <div class="slider-value-label" id="label-${s.id}">Balanced</div>
        `;
        wrapper.appendChild(section);
    });
}

function updateSliderPosition(container, clientX) {
    const rect = container.getBoundingClientRect();
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));

    const id = container.dataset.id;
    const left = container.dataset.left;
    const right = container.dataset.right;

    sliderValues[id] = Math.round(percent);
    container.querySelector('.slider-fill').style.width = `${percent}%`;
    container.querySelector('.slider-handle').style.left = `${percent}%`;

    // Update label
    const label = document.getElementById(`label-${id}`);
    if (label) {
        if (percent < 35) label.textContent = `Leaning ${left.toLowerCase()}`;
        else if (percent > 65) label.textContent = `Leaning ${right.toLowerCase()}`;
        else label.textContent = 'Balanced';
    }
}

function initSliderInteractions() {
    // Use event delegation on the sliders wrapper
    const wrapper = document.getElementById('slidersWrapper');
    if (!wrapper) return;

    const getSliderContainer = (el) => {
        while (el && !el.classList.contains('slider-container')) {
            el = el.parentElement;
        }
        return el;
    };

    const handleStart = (e) => {
        const container = getSliderContainer(e.target);
        if (!container) return;

        e.preventDefault();
        activeSlider = container;
        container.querySelector('.slider-handle').classList.add('dragging');

        const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
        updateSliderPosition(container, clientX);
    };

    const handleMove = (e) => {
        if (!activeSlider) return;
        e.preventDefault();

        const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
        updateSliderPosition(activeSlider, clientX);
    };

    const handleEnd = () => {
        if (activeSlider) {
            activeSlider.querySelector('.slider-handle').classList.remove('dragging');
            activeSlider = null;
        }
    };

    // Attach to wrapper for start events
    wrapper.addEventListener('mousedown', handleStart);
    wrapper.addEventListener('touchstart', handleStart, { passive: false });

    // Attach to document for move/end events
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('mouseleave', handleEnd);
}

function animateSliders() {
    document.querySelectorAll('.slider-section').forEach((s, i) => {
        setTimeout(() => s.classList.add('visible'), 200 + i * 150);
    });
}

// ==========================================
// PERSPECTIVES
// ==========================================
function setupPerspectives() {
    const stage = document.getElementById('perspectiveStage');
    const nav = document.getElementById('perspectiveNav');

    perspectivesData.forEach((p, i) => {
        const item = document.createElement('div');
        item.className = `perspective-item ${i === 0 ? 'active' : ''}`;
        item.innerHTML = `
            <p class="perspective-quote">${p.quote}</p>
            <p class="perspective-author">${p.author}</p>
            <p class="perspective-context">${p.context}</p>
        `;
        stage.appendChild(item);

        const dot = document.createElement('div');
        dot.className = `perspective-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => showPerspective(i));
        nav.appendChild(dot);
    });
}

function showPerspective(index) {
    const items = document.querySelectorAll('.perspective-item');
    const dots = document.querySelectorAll('.perspective-dot');

    items[currentPerspective].classList.add('exit');
    items[currentPerspective].classList.remove('active');
    dots[currentPerspective].classList.remove('active');

    setTimeout(() => {
        items[currentPerspective].classList.remove('exit');
        currentPerspective = index;
        items[currentPerspective].classList.add('active');
        dots[currentPerspective].classList.add('active');
    }, 400);
}

function startPerspectives() {
    clearInterval(perspectiveInterval);
    perspectiveInterval = setInterval(() => {
        showPerspective((currentPerspective + 1) % perspectivesData.length);
    }, 5000);
}

// ==========================================
// PROFILE
// ==========================================
function generateProfile() {
    // Simple algorithm based on sliders and matched analysis
    let profileIndex = 5; // Default: Balanced

    const timeValue = sliderValues.time || 50;
    const securityValue = sliderValues.security || 50;
    const recognitionValue = sliderValues.recognition || 50;

    // Check answer matches first
    if (matchedAnalysis.some(a => a.title.includes('Purpose') || a.title.includes('Creation'))) {
        profileIndex = 3; // Builder
    } else if (matchedAnalysis.some(a => a.title.includes('Connection'))) {
        profileIndex = 1; // Connector
    } else if (matchedAnalysis.some(a => a.title.includes('Time') || a.title.includes('Freedom'))) {
        profileIndex = 2; // Liberator
    } else if (matchedAnalysis.some(a => a.title.includes('Gratitude') || a.title.includes('Presence'))) {
        profileIndex = 4; // Present
    } else if (securityValue < 30 && recognitionValue > 70) {
        profileIndex = 2; // Liberator
    } else if (timeValue < 30) {
        profileIndex = 4; // Present
    } else {
        profileIndex = 0; // Philosopher
    }

    const profile = profileTypes[profileIndex];

    document.getElementById('profileTypeName').textContent = profile.name;
    document.getElementById('profileTypeSubtitle').textContent = profile.subtitle;

    const traitsContainer = document.getElementById('profileTraits');
    traitsContainer.innerHTML = profile.traits.map(t => `<span class="trait-tag">${t}</span>`).join('');

    document.getElementById('profileDescription').innerHTML = `<p>${profile.description}</p>`;
}

function animateProfile() {
    generateProfile();
    document.querySelectorAll('.trait-tag').forEach((t, i) => {
        setTimeout(() => t.classList.add('visible'), 300 + i * 100);
    });
}

// ==========================================
// SHARE
// ==========================================
function setupShare() {
    document.getElementById('shareMyRich').addEventListener('click', () => {
        document.getElementById('shareText').textContent = `"Rich is ${userAnswer}"`;
        document.getElementById('shareModal').classList.add('active');
    });

    document.getElementById('closeShare').addEventListener('click', () => {
        document.getElementById('shareModal').classList.remove('active');
    });

    document.getElementById('shareModal').addEventListener('click', (e) => {
        if (e.target.id === 'shareModal') {
            document.getElementById('shareModal').classList.remove('active');
        }
    });

    // Share button handlers
    const shareText = () => `Rich is ${userAnswer}`;
    const shareUrl = window.location.href;
    const fullText = `${shareText()} - What Is Rich?`;

    // Instagram - Copy to clipboard (Instagram doesn't support direct URL sharing)
    document.getElementById('shareInstagram').addEventListener('click', () => {
        const textToCopy = `${shareText()}\n\nExplore more: ${shareUrl}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Copied to clipboard! Paste it in your Instagram post.');
        }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Copied to clipboard! Paste it in your Instagram post.');
        });
    });

    // Facebook
    document.getElementById('shareFacebook').addEventListener('click', () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(fullText)}`;
        window.open(url, '_blank', 'width=600,height=400');
    });

    // TikTok - Copy to clipboard (TikTok doesn't support direct URL sharing)
    document.getElementById('shareTikTok').addEventListener('click', () => {
        const textToCopy = `${shareText()}\n\nExplore more: ${shareUrl}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Copied to clipboard! Paste it in your TikTok video description.');
        }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Copied to clipboard! Paste it in your TikTok video description.');
        });
    });

    // LinkedIn
    document.getElementById('shareLinkedIn').addEventListener('click', () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    });

    // X (Twitter)
    document.getElementById('shareX').addEventListener('click', () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    });
}

// ==========================================
// NAVIGATION
// ==========================================
function setupNavigation() {
    // Intro click
    document.getElementById('screen-0').addEventListener('click', () => {
        if (currentScreen === 0) showScreen(1);
    });

    // Continue buttons
    document.getElementById('toSpectrum').addEventListener('click', () => showScreen(3));
    document.getElementById('toPerspectives').addEventListener('click', () => showScreen(4));
    document.getElementById('toProfile').addEventListener('click', () => showScreen(5));
    document.getElementById('toCta').addEventListener('click', () => showScreen(6));

    // Nav dots
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const target = parseInt(dot.dataset.screen);
            // Only allow navigation to completed screens or current+1
            if (target <= currentScreen || (target === currentScreen + 1 && (currentScreen === 0 || userAnswer))) {
                showScreen(target);
            }
        });
    });
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    animateIntro();
    setupInput();
    setupSliders();
    setupPerspectives();
    setupShare();
    setupNavigation();
    showScreen(0);

    // Initialize slider interactions after a short delay to ensure DOM is ready
    setTimeout(initSliderInteractions, 100);
});
