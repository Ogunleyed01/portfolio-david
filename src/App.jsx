import { useState, useEffect, useRef } from 'react'
import heroImg from './assets/user_hero.jpg'
import secondaryImg from './assets/user_blue.jpg'
import './App.css'

const navSections = [
  { id: 'intro', label: 'Intro' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'ventures', label: 'Ventures' },
  { id: 'contact', label: 'Contact' }
]

const expertiseItems = [
  { num: '01', name: 'Front-End Engineering (React, Next.js 16, Vite)' },
  { num: '02', name: 'Gemini AI Integration & Prompt Pipelines' },
  { num: '03', name: 'TypeScript & Strict-Type Software Architecture' },
  { num: '04', name: 'Backend Services (Node.js, Fastify, Express, Django REST)' },
  { num: '05', name: 'Databases & ORM (PostgreSQL, PostGIS, Prisma, Supabase)' },
  { num: '06', name: 'Payments & BaaS (Paystack, Convex, Cloudinary)' },
  { num: '07', name: 'Figma-to-Code & Modern Responsive CSS / Tailwind' },
  { num: '08', name: 'Git Monorepos, CI/CD & Production Deployment' }
]

const projectFilters = [
  { id: 'all', label: 'ALL BUILDS' },
  { id: 'ai-fullstack', label: 'AI & FULL-STACK' },
  { id: 'backend-systems', label: 'BACKEND & SYSTEMS' },
  { id: 'commerce-web', label: 'COMMERCE & WEB' }
]

const workItems = [
  {
    id: 'ideatox',
    counter: 'PROJECT // 01 • FULL-STACK & AI',
    status: 'ACTIVE OPEN SOURCE',
    statusType: 'active',
    title: 'IdeaToX — Architectural Specification & Project Discovery',
    badge: 'Next.js 16 • React 19 • Gemini AI • Framer Motion',
    desc: 'The "GitHub + Dribbble" platform for software project ideas. Enables developers to discover validated technical architectures, generate 4-point MVP roadmaps with Gemini AI, remix specs via interactive lineage trees, and preview ideas with dynamic next/og cards.',
    highlights: [
      'Gemini AI Spec Generator with deterministic fallback engine',
      'Interactive visual lineage tree tracking remix & fork graphs',
      'Discovery bento feed with instant multi-facet tag filtering',
      'Dynamic 1200x630 OpenGraph card generation via next/og'
    ],
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Gemini AI', 'TailwindCSS v4', 'Framer Motion', 'Supabase'],
    category: 'ai-fullstack',
    github: 'https://github.com/Ogunleyed01/ideaToX',
    link: 'https://github.com/Ogunleyed01/ideaToX',
    linkLabel: 'VIEW ON GITHUB'
  },
  {
    id: 'connectme',
    counter: 'PROJECT // 02 • BOT & AUTOMATION',
    status: 'PRODUCTION PIPELINE',
    statusType: 'active',
    title: 'ConnectMe — 2027 Internship Tracker & Daily Digest Bot',
    badge: 'Telegram Bot API • Gemini 2.5 • Cron Automation',
    desc: 'Stateful, $0-budget Telegram bot that filters, scores, and delivers daily internship opportunities for university students targeting the 2027 IT/SIWES intake. Features a deterministic priority scoring engine, Gemini 2.5 Flash parsing pipeline, and automated GitHub Actions cron dispatches.',
    highlights: [
      'Deterministic priority scoring engine (0–100) with strict stipend weighting',
      'Gemini 2.5 Flash parsing pipeline for unstructured listing feeds',
      'Interactive 4-state lifecycle machine with 7-day automated follow-up check-ins',
      'Automated 08:00 WAT daily cron dispatches via GitHub Actions'
    ],
    tags: ['TypeScript', 'Node.js', 'Telegram Bot API', 'Gemini 2.5 Flash', 'Supabase', 'GitHub Actions'],
    category: 'backend-systems',
    github: 'https://github.com/Ogunleyed01/connectMe',
    link: 'https://github.com/Ogunleyed01/connectMe',
    linkLabel: 'VIEW ON GITHUB'
  },
  {
    id: 'rideshare',
    counter: 'PROJECT // 03 • DISTRIBUTED SYSTEMS',
    status: 'PRODUCTION BACKEND',
    statusType: 'active',
    title: 'RideShare — Monorepo Backend & Spatial Matching Services',
    badge: 'Fastify • PostgreSQL • PostGIS • Redis 7',
    desc: 'High-concurrency backend services for RideShare Nigeria engineered in a modular TypeScript monorepo. Features Fastify REST APIs, isolated background workers, PostgreSQL with PostGIS for real-time spatial geospatial rider-driver matching, and Redis 7 for low-latency session caching and queueing.',
    highlights: [
      'Spatial PostGIS indexing for low-latency rider-driver radius queries',
      'Modular monorepo architecture separating API gateways and background workers',
      'Redis 7 caching layer for real-time driver availability and state locks',
      'Robust CI/CD quality pipelines with TypeScript strict mode validation'
    ],
    tags: ['TypeScript', 'Fastify', 'Node.js 22', 'PostgreSQL', 'PostGIS', 'Redis 7', 'Monorepo'],
    category: 'backend-systems',
    github: 'https://github.com/Blackwrld04/RIdeShare',
    link: 'https://github.com/Blackwrld04/RIdeShare',
    linkLabel: 'VIEW ON GITHUB'
  },
  {
    id: 'newmarket',
    counter: 'PROJECT // 04 • E-COMMERCE',
    status: 'CAMPUS E-COMMERCE',
    statusType: 'active',
    title: 'NewMarket — Campus Multi-Vendor Marketplace & Checkout',
    badge: 'React / Vite • Express • Prisma • Paystack',
    desc: 'Campus-tailored multi-vendor marketplace platform connecting student buyers with student merchants. Implements role-based storefront management, Paystack checkout integration with secure webhook verification, Prisma ORM on PostgreSQL, and Cloudinary media processing.',
    highlights: [
      'End-to-end Paystack payment flow with automated webhook verification',
      'Role-based vendor onboarding, inventory creation, and fulfillment tracking',
      'Prisma ORM schema modeling with PostgreSQL relational persistence',
      'Split deployment architecture across Vercel frontend and Render backend'
    ],
    tags: ['React / Vite', 'Node.js / Express', 'Prisma ORM', 'PostgreSQL', 'Paystack API', 'Cloudinary'],
    category: 'commerce-web',
    github: 'https://github.com/Ogunleyed01/NewMarket',
    link: 'https://github.com/Ogunleyed01/NewMarket',
    linkLabel: 'VIEW ON GITHUB'
  },
  {
    id: 'edgeiq',
    counter: 'PROJECT // 05 • TOP 5 FINALIST',
    status: 'BWAI HACKATHON FINALIST',
    statusType: 'award',
    title: 'EdgeIQ — Quantitative Trading Intelligence Platform',
    badge: 'Gemini AI • Django REST • React/Vite',
    desc: 'Built a Gemini AI-powered quantitative trading intelligence platform for prediction market traders at the GDG OAU Build with AI Hackathon, securing a Top 5 Finalist placement. Engineered backend-frontend integration with Django REST Framework and React/Vite.',
    highlights: [
      'Top 5 Finalist finish out of competitive regional hackathon teams',
      'Seamless REST API integration between Django REST Framework and React/Vite',
      'Gemini AI market analysis and predictive sentiment evaluation',
      'End-to-end user authentication, market data feed, and portfolio tracking'
    ],
    tags: ['Gemini AI', 'React / Vite', 'Django REST', 'TailwindCSS', 'Hackathon Top 5'],
    category: 'ai-fullstack',
    github: 'https://github.com/femix300/Edge-IQ',
    link: 'https://edge-iq-psi.vercel.app/',
    linkLabel: 'VIEW LIVE DEMO',
    secondaryLink: 'https://github.com/femix300/Edge-IQ',
    secondaryLabel: 'GITHUB'
  },
  {
    id: 'p2p-lms',
    counter: 'PROJECT // 06 • P2P LEARNING',
    status: 'COLLABORATIVE BUILD',
    statusType: 'active',
    title: 'PL (Peer Learning) — Skill Exchange Platform',
    badge: 'Figma-to-Code • JavaScript (ES6)',
    desc: 'Peer-to-peer skill exchange platform connecting students who want to teach a skill with those who want to learn one. Built 4–5 responsive pages from Figma designs in collaboration with another frontend developer.',
    highlights: [
      'Pixel-perfect translation of multi-page Figma specifications',
      'Modular, accessible UI components with pure semantic CSS',
      'Collaborative Git workflow with code reviews and branch management'
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'Figma to Code', 'Git Workflow'],
    category: 'commerce-web',
    github: 'https://github.com/olamidefasogbon/P2P-LMS',
    link: 'https://github.com/olamidefasogbon/P2P-LMS',
    linkLabel: 'VIEW ON GITHUB'
  }
]

const experienceItems = [
  {
    num: '01 // SEASONAL',
    role: 'Frontend Developer',
    company: 'GDG OAU',
    tenure: 'APR 2026 — JUL 2026 • IFE, OSUN STATE, NIGERIA',
    body: 'Contributed as Frontend Developer during the Build with AI (BWAI) OAU Hackathon. Built the EdgeIQ quantitative trading intelligence platform from PRD and pitch deck to full UI production.',
    tags: ['Front-End Development', 'Git', 'React/Vite', 'Django REST', 'Gemini AI'],
    impact: [
      'Finished in the Top 5 Finalists of the GDG OAU BWAI Hackathon in a team of 4',
      'Engineered seamless REST API integration between Django REST Framework and React/Vite',
      'Delivered end-to-end functionality across signup, login, market data, and portfolio flows'
    ]
  },
  {
    num: '02 // INTERNSHIP',
    role: 'Frontend Engineer',
    company: 'HNG Tech',
    tenure: 'OCT 2025 — DEC 2025 • REMOTE',
    body: 'Worked on individual projects ranging from profile cards, multi-framework web apps, e-commerce web apps, to mobile todo apps (Expo). From Stage 5, recruited to a core product team as an FE intern to launch production software.',
    tags: ['E-Commerce', 'Git', 'React', 'Convex BaaS', 'Expo Mobile'],
    impact: [
      'Developed pixel-perfect Audiophile e-commerce website referencing Figma UI designs',
      'Integrated Convex (BaaS) for authentication, cloud storage, and database state',
      'Collaborated closely with technical team members to bring products to production'
    ]
  }
]

export default function App() {
  // Splash screen state
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Custom Cursor coordinates & hover state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorActive, setCursorActive] = useState(false)
  const [cursorReady, setCursorReady] = useState(false)

  // Nav state
  const [activeSection, setActiveSection] = useState('hero')
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState('')

  // Project Filter & Clone Copy states
  const [activeProjectFilter, setActiveProjectFilter] = useState('all')
  const [copiedCloneId, setCopiedCloneId] = useState(null)

  const navRef = useRef(null)
  const canvasRef = useRef(null)

  // 1. Splash Screen Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 300)
          return 100
        }
        return prev + 5
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])

  // 2. Custom Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      if (!cursorReady) setCursorReady(true)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [data-cursor-hover]')
      setCursorActive(!!target)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorReady])

  // 3. Canvas Fluid Ripple Effect in Hero
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 3 + 1,
      alpha: Math.random() * 0.4 + 0.1
    }))

    let mouse = { x: width / 2, y: height / 2, active: false }
    const onCanvasMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    window.addEventListener('mousemove', onCanvasMove)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      if (mouse.active) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180)
        gradient.addColorStop(0, 'rgba(232, 64, 32, 0.12)')
        gradient.addColorStop(1, 'rgba(232, 64, 32, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2)
        ctx.fill()
      }

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.fillStyle = `rgba(232, 64, 32, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onCanvasMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // 4. Scroll Indicator Slider Math
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      const sections = ['hero', ...navSections.map((s) => s.id)]

      for (let id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Recalculate slider pill position
  useEffect(() => {
    if (!navRef.current) return
    const activeLink = navRef.current.querySelector(`.nav-pill a[href="#${activeSection}"]`)
    if (activeLink) {
      setIndicatorStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth
      })
    }
  }, [activeSection])

  const copyEmail = () => {
    navigator.clipboard.writeText('ogunleyedavid@gmail.com')
    setCopyFeedback('COPIED!')
    setTimeout(() => setCopyFeedback(''), 2000)
  }

  const copyCloneCommand = (githubUrl, id) => {
    navigator.clipboard.writeText(`git clone ${githubUrl}.git`)
    setCopiedCloneId(id)
    setTimeout(() => setCopiedCloneId(null), 2200)
  }

  return (
    <>
      {/* 1. Custom Glowing Circle Cursor */}
      <div
        className={`custom-cursor ${cursorReady ? 'is-ready' : ''} ${cursorActive ? 'custom-cursor--active' : ''}`}
        style={{
          '--cx': `${cursorPos.x}px`,
          '--cy': `${cursorPos.y}px`
        }}
      />

      {/* 2. Splash Screen */}
      {loading && (
        <div id="splash" className={progress === 100 ? 'fade-out' : ''}>
          <div className="splash-inner">
            <div className="splash-label">DAVID OGUNLEYE</div>
            <div className="splash-name">
              FRONTEND <span>ENGINEER</span>
            </div>
            <div className="splash-track">
              <div className="splash-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* 3. Floating Glassmorphism Nav */}
      <nav id="nav" ref={navRef}>
        <a href="#hero" className="nav-logo">
          DAVID OGUNLEYE<span className="nav-dot">.</span>
        </a>

        <ul className={`nav-pill ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div
            className="nav-indicator is-ready"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`
            }}
          />
          {navSections.map((sec) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                className={activeSection === sec.id ? 'is-active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {sec.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </nav>

      {/* 4. Hero Section - Orange Background Photo with WebGL Liquid Water Distortion Canvas */}
      <section id="hero">
        <div className="hero-photo-wrap">
          <img src={heroImg} alt="David Ogunleye orange lighting portrait" />
        </div>

        <canvas id="hero-canvas" ref={canvasRef} />

        <div className="hero-social">
          <a href="https://www.linkedin.com/in/david-ogunleye-b48032281/" target="_blank" rel="noreferrer">
            <span>in</span> LinkedIn
          </a>
          <a href="mailto:ogunleyedavid@gmail.com">
            <span>✉</span> Email
          </a>
          <a href="tel:+2348059494191">
            <span>☎</span> Phone
          </a>
        </div>

        <div className="hero-title">
          <div className="hero-title-text">
            <span className="hero-title-slash">//</span> Frontend Engineer
            <br />
            Building responsive, high-performance web products
          </div>
        </div>

        <div className="hero-name-wrap">
          <h1 className="hero-name">DAVID OGUNLEYE</h1>
        </div>

        <button
          className="scroll-hint"
          onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to intro section"
        >
          ↓
        </button>
      </section>

      {/* 5. Intro Section */}
      <section id="intro">
        <div className="intro-inner">
          <h2 className="intro-statement">
            I engineer <span className="accent-phrase">pixel-perfect frontend interfaces</span> & modern web apps.
          </h2>

          <div className="intro-right">
            <p className="intro-body">
              Frontend Engineer specializing in React, JavaScript (ES6), REST API integrations, and TailwindCSS — building clean, interactive web applications from Figma designs to production.
            </p>

            <a href="#about" className="intro-cta">
              READ MY STORY
            </a>

            <div className="intro-stats">
              <div>
                <div className="intro-stat-num red">TOP 5</div>
                <div className="intro-stat-label">BWAI HACKATHON</div>
              </div>
              <div>
                <div className="intro-stat-num">HNG TECH</div>
                <div className="intro-stat-label">FE FELLOWSHIP</div>
              </div>
              <div>
                <div className="intro-stat-num red">100%</div>
                <div className="intro-stat-label">PIXEL PERFECT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Numbered Section 01: Expertise */}
      <section id="expertise" className="numbered-section">
        <div className="ns-header">
          <div className="ns-ghost-num">01</div>
          <div className="ns-title-block">
            <span className="sec-label">EXPERTISE</span>
            <h2 className="ns-h2">Engineering Disciplines & Skills</h2>
            <p className="ns-desc">
              Core technologies and frontend practices utilized to build robust digital products.
            </p>
          </div>
        </div>

        <div className="h-list-2col">
          {expertiseItems.map((item) => (
            <div className="h-list-item" key={item.name}>
              <span className="h-item-name">{item.name}</span>
              <span className="h-item-num">{item.num}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Numbered Section 02: About - Second Image (Blue Background) */}
      <section id="about" className="numbered-section light">
        <div className="ns-header">
          <div className="ns-ghost-num">02</div>
          <div className="ns-title-block">
            <span className="sec-label">ABOUT</span>
            <h2 className="ns-h2">Frontend Engineer</h2>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-photo">
            <img src={secondaryImg} alt="David Ogunleye blue background portrait" />
            <div className="about-photo-tag">FRONTEND ENGINEER</div>
          </div>

          <div className="about-text">
            <p className="about-body">
              I am a dedicated <strong>Frontend Engineer</strong> with hands-on experience developing web applications across hackathons, internships, and collaborative developer teams.
            </p>

            <p className="about-body">
              At <strong>GDG OAU Build with AI Hackathon</strong>, I co-built <strong>EdgeIQ</strong> — a Gemini AI quantitative trading platform that placed in the <strong>Top 5 Finalists</strong>. At <strong>HNG Tech</strong>, I built pixel-perfect e-commerce applications referencing Figma UI designs with Convex BaaS authentication and database storage.
            </p>

            <div className="cert-block">
              <div className="cert-bar" />
              <div>
                <div className="cert-name">Frontend Web Engineering</div>
                <div className="cert-sub">
                  React, Vite, Django REST Integration, TailwindCSS, Convex BaaS & Figma UX
                </div>
              </div>
            </div>

            <div className="live-row">
              <span className="live-dot" />
              AVAILABLE FOR FRONTEND & FULL STACK OPPORTUNITIES
            </div>
          </div>
        </div>
      </section>

      {/* 8. Numbered Section 03: Experience */}
      <section id="experience" className="numbered-section">
        <div className="ns-header">
          <div className="ns-ghost-num">03</div>
          <div className="ns-title-block">
            <span className="sec-label">EXPERIENCE</span>
            <h2 className="ns-h2">Work History & Fellowships</h2>
          </div>
        </div>

        <div className="exp-list">
          {experienceItems.map((exp) => (
            <div className="exp-item" key={exp.role + exp.company}>
              <div>
                <div className="exp-left-num">{exp.num}</div>
                <h3 className="exp-role">{exp.role}</h3>
                <div className="exp-company">{exp.company}</div>
                <p className="exp-body">{exp.body}</p>

                <div className="exp-impact">
                  {exp.impact.map((point, i) => (
                    <div className="exp-impact-row" key={i}>
                      <span className="impact-dot" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="exp-right">
                <div className="exp-tenure">{exp.tenure}</div>
                <div className="exp-tags">
                  {exp.tags.map((tag) => (
                    <span className="exp-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Numbered Section 04: Selected Work */}
      <section id="work" className="numbered-section">
        <div className="ns-header">
          <div className="ns-ghost-num">04</div>
          <div className="ns-title-block">
            <span className="sec-label">SELECTED WORK</span>
            <h2 className="ns-h2">Projects & Engineering Builds</h2>
            <p className="ns-desc">
              Production web applications, intelligent automation bots, distributed backend architectures, and campus marketplaces engineered with clean code.
            </p>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="work-filter-bar">
          {projectFilters.map((filter) => {
            const count =
              filter.id === 'all'
                ? workItems.length
                : workItems.filter((w) => w.category === filter.id).length
            return (
              <button
                key={filter.id}
                className={`work-filter-btn ${activeProjectFilter === filter.id ? 'is-active' : ''}`}
                onClick={() => setActiveProjectFilter(filter.id)}
                type="button"
              >
                <span>{filter.label}</span>
                <span className="work-filter-count">[{count}]</span>
              </button>
            )
          })}
        </div>

        <div className="work-grid">
          {workItems
            .filter((work) => activeProjectFilter === 'all' || work.category === activeProjectFilter)
            .map((work) => (
              <article className="work-card" key={work.id || work.title}>
                <div className="work-card-top">
                  <div className="work-card-header">
                    <span className="work-counter">{work.counter}</span>
                    <div className={`work-status-badge ${work.statusType}`}>
                      <span className="work-status-dot" />
                      <span>{work.status}</span>
                    </div>
                  </div>

                  <h3 className="work-title">
                    <a href={work.link} target="_blank" rel="noreferrer">
                      {work.title}
                    </a>
                  </h3>

                  {work.badge && <div className="work-badge">{work.badge}</div>}

                  <p className="work-desc">{work.desc}</p>

                  {work.highlights && work.highlights.length > 0 && (
                    <div className="work-highlights">
                      <div className="work-highlights-label">// ARCHITECTURAL HIGHLIGHTS</div>
                      <ul className="work-highlights-list">
                        {work.highlights.map((item, idx) => (
                          <li key={idx}>
                            <span className="work-hl-icon">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="work-tags">
                    {work.tags.map((tag) => (
                      <span className="work-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="work-card-footer">
                  <div className="work-links-group">
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noreferrer"
                      className="work-link"
                    >
                      {work.linkLabel || 'VIEW PROJECT'} <span className="arrow-icon">↗</span>
                    </a>

                    {work.secondaryLink && (
                      <a
                        href={work.secondaryLink}
                        target="_blank"
                        rel="noreferrer"
                        className="work-link-secondary"
                      >
                        {work.secondaryLabel || 'GITHUB'} <span className="arrow-icon">↗</span>
                      </a>
                    )}
                  </div>

                  {work.github && (
                    <button
                      className="work-clone-btn"
                      onClick={() => copyCloneCommand(work.github, work.id)}
                      title={`Copy clone command: git clone ${work.github}.git`}
                      type="button"
                    >
                      {copiedCloneId === work.id ? 'CLONE CMD COPIED!' : 'CLONE CMD'}
                    </button>
                  )}
                </div>
              </article>
            ))}
        </div>
      </section>

      {/* 10. Numbered Section 05: Ventures & Showcase */}
      <section id="ventures" className="numbered-section light">
        <div className="ns-header">
          <div className="ns-ghost-num">05</div>
          <div className="ns-title-block">
            <span className="sec-label">VENTURES</span>
            <h2 className="ns-h2">Featured Innovations</h2>
          </div>
        </div>

        {/* HeroFrame Showcase */}
        <div className="hf-block">
          <div className="hf-body">
            <div>
              <h3 className="hf-tagline">
                Build With AI <span>& Hackathon Innovation</span>
              </h3>
              <p className="hf-desc">
                Engineering AI-powered financial trading intelligence and interactive web applications designed for scale and usability.
              </p>
            </div>

            <div className="hf-poster-fan">
              <img src={heroImg} alt="Orange portrait showcase" className="hf-poster" />
              <img src={secondaryImg} alt="Blue portrait showcase" className="hf-poster" />
              <img src={heroImg} alt="Orange portrait showcase" className="hf-poster" />
            </div>
          </div>

          <div className="hf-marquee-wrap">
            <div className="hf-marquee">
              <div className="hf-marquee-item">REACT 19 / VITE</div>
              <div className="hf-marquee-item">NEXT.JS 16</div>
              <div className="hf-marquee-item">TYPESCRIPT</div>
              <div className="hf-marquee-item">GEMINI AI</div>
              <div className="hf-marquee-item">FASTIFY</div>
              <div className="hf-marquee-item">POSTGIS & POSTGRESQL</div>
              <div className="hf-marquee-item">PRISMA ORM</div>
              <div className="hf-marquee-item">PAYSTACK PAYMENTS</div>
              <div className="hf-marquee-item">DJANGO REST</div>
              <div className="hf-marquee-item">TAILWINDCSS</div>
              {/* Duplicate */}
              <div className="hf-marquee-item">REACT 19 / VITE</div>
              <div className="hf-marquee-item">NEXT.JS 16</div>
              <div className="hf-marquee-item">TYPESCRIPT</div>
              <div className="hf-marquee-item">GEMINI AI</div>
              <div className="hf-marquee-item">FASTIFY</div>
              <div className="hf-marquee-item">POSTGIS & POSTGRESQL</div>
              <div className="hf-marquee-item">PRISMA ORM</div>
              <div className="hf-marquee-item">PAYSTACK PAYMENTS</div>
              <div className="hf-marquee-item">DJANGO REST</div>
              <div className="hf-marquee-item">TAILWINDCSS</div>
            </div>
          </div>
        </div>

        {/* EdgeIQ Showcase Card */}
        <div className="en-block">
          <div>
            <h3 className="en-tagline">
              EdgeIQ <span>Quantitative Trading AI</span>
            </h3>
            <p className="en-desc">
              Gemini AI-powered quantitative trading intelligence platform built for GDG OAU Build with AI Hackathon, securing a Top 5 finalist finish.
            </p>
            <a href="#work" className="en-cta">
              EXPLORE EDGEIQ CASE STUDY →
            </a>
          </div>
        </div>
      </section>

      {/* 11. Numbered Section 06: Contact */}
      <section id="contact" className="numbered-section">
        <div className="contact-wrap">
          <div className="ns-header" style={{ borderTop: 'none', marginBottom: '32px', paddingTop: 0 }}>
            <div className="ns-ghost-num">06</div>
            <div className="ns-title-block">
              <span className="sec-label">GET IN TOUCH</span>
              <h2 className="ns-h2">Let&apos;s Build Something Remarkable</h2>
            </div>
          </div>

          <div className="contact-grid">
            <div>
              <p className="contact-callout">
                If you&apos;re looking for a <span>Frontend Engineer</span> to build your next web application — let&apos;s talk.
              </p>

              <div className="contact-photo">
                <img src={secondaryImg} alt="David Ogunleye contact" />
              </div>
            </div>

            <div className="contact-list">
              <div className="contact-row">
                <span className="contact-label">EMAIL</span>
                <span className="contact-value">
                  <a href="mailto:ogunleyedavid@gmail.com">ogunleyedavid@gmail.com</a>
                </span>
              </div>
              <div className="contact-row">
                <span className="contact-label">PHONE</span>
                <span className="contact-value">
                  <a href="tel:+2348059494191">+2348059494191</a>
                </span>
              </div>
              <div className="contact-row">
                <span className="contact-label">LINKEDIN</span>
                <span className="contact-value">
                  <a href="https://www.linkedin.com/in/david-ogunleye-b48032281/" target="_blank" rel="noreferrer">
                    linkedin.com/in/david-ogunleye-b48032281
                  </a>
                </span>
              </div>
              <div className="contact-row">
                <span className="contact-label">LOCATION</span>
                <span className="contact-value">Ibadan, Nigeria</span>
              </div>
              <div className="contact-row">
                <span className="contact-label">ACTION</span>
                <button
                  onClick={copyEmail}
                  style={{
                    background: 'none',
                    border: '1px solid var(--accent)',
                    color: '#fff',
                    fontFamily: 'var(--mono)',
                    fontSize: '11px',
                    padding: '6px 14px',
                    cursor: 'none'
                  }}
                >
                  {copyFeedback || 'COPY EMAIL'}
                </button>
              </div>
            </div>
          </div>

          <footer className="footer-bottom">
            <div>© {new Date().getFullYear()} DAVID OGUNLEYE. ALL RIGHTS RESERVED.</div>
            <button
              className="back-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑ BACK TO TOP
            </button>
          </footer>
        </div>
      </section>
    </>
  )
}
