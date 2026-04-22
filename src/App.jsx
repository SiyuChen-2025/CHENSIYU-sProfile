  import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WORKS } from './data/works'

const SPLASH_ROTATE_MS = 2000
const SPLASH_PARTICLE_MS = 1320
/** 与白底遮罩淡出时间对齐：消散过程中首页逐渐透出 */
const SPLASH_REVEAL_MS = 1580
const SPLASH_HOLD_MS = SPLASH_ROTATE_MS + SPLASH_REVEAL_MS + 160
const SPLASH_LABEL = "CHENSIYU's Profile"

function App() {
  const worksScrollRef = useRef(null)
  const mouseRef = useRef({ x: 0, inArea: false })
  const rafRef = useRef(null)
  const speedRef = useRef(0)
  const splashOverlayRef = useRef(null)
  const splashTextRef = useRef(null)
  const splashParticleCanvasRef = useRef(null)
  const [splashHidden, setSplashHidden] = useState(() => sessionStorage.getItem('homeSplashShown') === '1')
  const [splashRevealActive, setSplashRevealActive] = useState(false)

  const placeholderSvg = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="96" fill="#eee"/><circle cx="96" cy="76" r="28" fill="#ccc"/><path fill="#ccc" d="M96 116c-33 0-60 18-60 40v12h120v-12c0-22-27-40-60-40z"/></svg>'
  )

  const onWorksMouseMove = (e) => {
    const el = worksScrollRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
  }

  const onWorksMouseEnter = () => {
    mouseRef.current.inArea = true
  }

  const onWorksMouseLeave = () => {
    mouseRef.current.inArea = false
  }

  useEffect(() => {
    // 回主页时恢复滚动（配合项目内页的“返回首页”）
    const homeScrollY = sessionStorage.getItem('homeScrollY')
    const worksScrollLeft = sessionStorage.getItem('worksScrollLeft')

    if (homeScrollY !== null) {
      window.scrollTo(0, Number(homeScrollY))
    }
    if (worksScrollLeft !== null && worksScrollRef.current) {
      worksScrollRef.current.scrollLeft = Number(worksScrollLeft)
    }

    sessionStorage.removeItem('homeScrollY')
    sessionStorage.removeItem('worksScrollLeft')
  }, [])

  useEffect(() => {
    // 首次打开主页的开场动画（只在第一次生效）
    // 注意：勿在定时器触发前写入 homeSplashShown。开发环境下 StrictMode 会卸载再挂载，
    // 若已写入，第二次挂载会立刻隐藏遮罩，导致停留时间始终很短。
    const shown = sessionStorage.getItem('homeSplashShown') === '1'
    if (shown) {
      setSplashHidden(true)
      return
    }

    const holdMs = SPLASH_HOLD_MS
    const t = window.setTimeout(() => {
      sessionStorage.setItem('homeSplashShown', '1')
      setSplashRevealActive(false)
      setSplashHidden(true)
    }, holdMs)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('homeSplashShown') === '1') return

    const overlayEl = splashOverlayRef.current
    const textEl = splashTextRef.current
    const canvasEl = splashParticleCanvasRef.current
    if (!overlayEl || !textEl || !canvasEl) return

    let burstTimer = 0
    let rafId = 0

    const runBurst = () => {
      const overlayR = overlayEl.getBoundingClientRect()
      const textR = textEl.getBoundingClientRect()
      const cs = getComputedStyle(textEl)
      const angle = Math.PI * 2

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(12, Math.ceil(textR.width))
      const h = Math.max(12, Math.ceil(textR.height))
      const off = document.createElement('canvas')
      off.width = Math.max(1, Math.floor(w * dpr))
      off.height = Math.max(1, Math.floor(h * dpr))
      const octx = off.getContext('2d', { willReadFrequently: true })
      if (!octx) return
      octx.scale(dpr, dpr)
      octx.clearRect(0, 0, w, h)
      octx.save()
      octx.translate(w / 2, h / 2)
      octx.rotate(angle)
      octx.fillStyle = '#1e3a8a'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      if (cs.letterSpacing && cs.letterSpacing !== 'normal') {
        octx.letterSpacing = cs.letterSpacing
      }
      octx.fillText(SPLASH_LABEL, 0, 0)
      octx.restore()

      const img = octx.getImageData(0, 0, off.width, off.height)
      const step = 3
      const particles = []
      const textLeft = textR.left - overlayR.left
      const textTop = textR.top - overlayR.top
      const speedScale = Math.min(1.4, overlayR.width / 460)

      for (let py = 0; py < off.height; py += step) {
        for (let px = 0; px < off.width; px += step) {
          const idx = (py * off.width + px) * 4
          const a = img.data[idx + 3]
          if (a < 70) continue
          const r = img.data[idx]
          const g = img.data[idx + 1]
          const b = img.data[idx + 2]
          const lx = px / dpr
          const ly = py / dpr
          const ox = textLeft + (lx / w) * textR.width
          const oy = textTop + (ly / h) * textR.height
          const ang = Math.random() * Math.PI * 2
          const sp = (0.11 + Math.random() * 0.22) * speedScale
          particles.push({
            x: ox,
            y: oy,
            vx: Math.cos(ang) * sp,
            vy: Math.sin(ang) * sp,
            r,
            g,
            b,
            a0: a / 255,
            life: 1,
          })
        }
      }

      const cap = 3000
      while (particles.length > cap) {
        particles.splice((Math.random() * particles.length) | 0, 1)
      }

      textEl.classList.add('home-splash-text--hidden')
      canvasEl.classList.add('home-splash-particle-canvas--active')

      const ctx = canvasEl.getContext('2d')
      if (!ctx) return
      const ow = overlayR.width
      const oh = overlayR.height
      canvasEl.width = Math.max(1, Math.floor(ow * dpr))
      canvasEl.height = Math.max(1, Math.floor(oh * dpr))
      canvasEl.style.width = `${ow}px`
      canvasEl.style.height = `${oh}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const t0 = performance.now()
      let prev = t0

      const stepFrame = (now) => {
        const elapsed = now - t0
        if (elapsed > SPLASH_PARTICLE_MS) {
          return
        }
        const dt = Math.min(40, now - prev)
        prev = now
        ctx.clearRect(0, 0, ow, oh)

        const drag = Math.pow(0.992, dt / 16)
        const lifeDecay = 0.00082 * dt
        const accel = 1 + 0.000085 * dt

        for (const p of particles) {
          p.vx *= accel
          p.vy *= accel
          p.x += p.vx * dt
          p.y += p.vy * dt
          p.vx *= drag
          p.vy *= drag
          p.life -= lifeDecay
          if (p.life <= 0) continue
          const alpha = p.a0 * p.life
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${Math.min(1, alpha)})`
          const rad = 0.9 + p.life * 1.7
          ctx.beginPath()
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2)
          ctx.fill()
        }

        rafId = requestAnimationFrame(stepFrame)
      }
      rafId = requestAnimationFrame(stepFrame)
    }

    burstTimer = window.setTimeout(() => {
      runBurst()
      setSplashRevealActive(true)
    }, SPLASH_ROTATE_MS)

    return () => {
      window.clearTimeout(burstTimer)
      cancelAnimationFrame(rafId)
      setSplashRevealActive(false)
      textEl.classList.remove('home-splash-text--hidden')
      canvasEl.classList.remove('home-splash-particle-canvas--active')
    }
  }, [])

  useEffect(() => {
    const el = worksScrollRef.current
    if (!el) return

    const maxSpeed = 3.5
    const zoneRatio = 0.2
    const ease = 0.11

    const tick = () => {
      const rect = el.getBoundingClientRect()
      const w = rect.width
      const zone = w * zoneRatio
      let targetSpeed = 0

      if (mouseRef.current.inArea) {
        const x = mouseRef.current.x
        if (x > w - zone) {
          targetSpeed = ((x - (w - zone)) / zone) * maxSpeed
        } else if (x < zone) {
          targetSpeed = -((zone - x) / zone) * maxSpeed
        }
      }

      speedRef.current += (targetSpeed - speedRef.current) * ease
      if (Math.abs(speedRef.current) < 0.02) speedRef.current = 0

      const next = el.scrollLeft + speedRef.current
      el.scrollLeft = Math.max(0, Math.min(next, el.scrollWidth - w))

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <div
        ref={splashOverlayRef}
        className={`home-splash-overlay${splashHidden ? ' is-hidden' : ''}${splashRevealActive ? ' home-splash-overlay--revealing' : ''}`}
        style={{ '--splash-rotate-ms': `${SPLASH_ROTATE_MS}ms` }}
        aria-hidden="true"
      >
        <div className="home-splash-text-stage">
          <div className="home-splash-text" ref={splashTextRef}>
            CHENSIYU&apos;s Profile
          </div>
        </div>
        <canvas className="home-splash-particle-canvas" ref={splashParticleCanvasRef} aria-hidden="true" />
      </div>

      <header className="site-nav">
        <nav className="site-nav-inner">
          <a href="#" className="site-name-wrap">
            <span className="site-name">陈思羽的作品主页</span>
            <span className="site-name-en">CHEN SIYU's Portfolio | Interaction Design | AI-aided Design | Others</span>
          </a>
          <div className="nav-items">
            <Link to="/profile" className="nav-item">
              关于我
              <span className="nav-item-en">About Me</span>
            </Link>
            <Link to="/works" className="nav-item">
              作品和经历
              <span className="nav-item-en">Works & Experience</span>
            </Link>
            <a href="#contact" className="nav-item">
              联系我
              <span className="nav-item-en">Contact Me</span>
            </a>
          </div>
        </nav>
      </header>

      <main className="site-main">
        <section className="intro-row" id="about">
          <img
            src={`${import.meta.env.BASE_URL}avatar.png`}
            alt="陈思羽"
            className="intro-avatar"
            onError={(e) => { e.target.onerror = null; e.target.src = placeholderSvg }}
          />
          <div className="intro-content">
            <h1 className="title-with-en">陈思羽</h1>
            <span className="title-en">CHEN SIYU</span>
            <p className="intro-text">
              热爱旅行、阅读、影音和捣鼓一些奇怪的设计与技术。这里是我的个人主页，记录一些参与的项目与学习心得。
            </p>
            <span className="intro-text-en">
              I love traveling, photography, and tinkering with designs and new tech. This is my personal website, where I document the projects I've worked on and my learning experiences.
            </span>
            <Link to="/profile" className="intro-detail">
              查看详情
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>

        <section className="section" id="works">
          <h2 className="section-head">作品与经历</h2>
          <span className="section-head-en">Works & Experience</span>
          <div
            ref={worksScrollRef}
            className="work-scroll-wrap"
            onMouseMove={onWorksMouseMove}
            onMouseEnter={onWorksMouseEnter}
            onMouseLeave={onWorksMouseLeave}
          >
            <div className="work-grid">
              {WORKS.map((item) => {
                return (
                  <article key={item.id} className="work-card">
                    <Link
                      to={`/work/${item.id}`}
                      className="work-card-trigger"
                      onClick={() => {
                        // 保存“进入项目前”的页面状态（用于返回首页时衔接）
                        sessionStorage.setItem('homeScrollY', String(window.scrollY))
                        sessionStorage.setItem(
                          'worksScrollLeft',
                          String(worksScrollRef.current?.scrollLeft ?? 0),
                        )
                      }}
                    >
                      <div className="work-card-thumb">
                        <img src={item.coverImage} alt={item.title} loading="lazy" decoding="async" />
                      </div>
                      <div className="work-card-body">
                        <h3 className="work-card-title">{item.title}</h3>
                        <p className="work-card-desc">{item.subtitle}</p>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <h2 className="section-head">联系我</h2>
          <span className="section-head-en">Contact Me</span>
          <div className="contact-grid">
            <div className="contact-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <label>邮箱</label>
              <span className="contact-label-en">Email</span>
              <span>230613202@mail.dhu.edu.cn</span>
            </div>
            <div className="contact-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <label>电话</label>
              <span className="contact-label-en">Phone</span>
              <span>+86 19857125443</span>
            </div>
            <div className="contact-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <label>地址</label>
              <span className="contact-label-en">Location</span>
              <span>上海市长宁区-东华大学延安路校区</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          © 2026 陈思羽
         
        </p>
      </footer>
    </div>
  )
}

export default App
