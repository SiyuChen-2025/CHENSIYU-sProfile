  import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WORKS } from './data/works'

const SPLASH_TEXT_MS = 700
const SPLASH_REVEAL_DELAY_MS = SPLASH_TEXT_MS + 500
const SPLASH_HOLD_MS = SPLASH_REVEAL_DELAY_MS + 1000

function App() {
  const worksScrollRef = useRef(null)
  const mouseRef = useRef({ x: 0, inArea: false })
  const rafRef = useRef(null)
  const speedRef = useRef(0)
  const splashOverlayRef = useRef(null)
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
    const shown = sessionStorage.getItem('homeSplashShown') === '1'
    if (shown) {
      setSplashHidden(true)
      return
    }

    const revealTimer = window.setTimeout(() => {
      setSplashRevealActive(true)
    }, SPLASH_REVEAL_DELAY_MS)

    const holdTimer = window.setTimeout(() => {
      sessionStorage.setItem('homeSplashShown', '1')
      setSplashRevealActive(false)
      setSplashHidden(true)
    }, SPLASH_HOLD_MS)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(holdTimer)
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
        aria-hidden="true"
      >
        <div className="home-splash-panel home-splash-panel--left" />
        <div className="home-splash-panel home-splash-panel--right" />
        <div className="home-splash-text-stage">
          <div className="home-splash-text">
            CHENSIYU&apos;s Profile
          </div>
          <div className="home-splash-line" />
        </div>
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
