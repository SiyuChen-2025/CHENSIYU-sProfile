import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { WORKS } from './data/works'
import { localizeWork } from './data/workTranslations'
import SiteHeader, { Star } from './components/SiteHeader'
import useLanguage from './hooks/useLanguage'

const HOME_COPY = {
  zh: {
    eyebrow: 'HELLO, THIS IS MY CREATIVE UNIVERSE', roles: ['人机交互', 'AI 辅助设计', '服务设计'],
    intro: '热爱旅行、阅读、影音和捣鼓一些奇怪的设计与技术。这里是我的个人主页，记录一些参与的项目与学习心得。',
    primary: '查看作品', secondary: '认识我', worksTitle: '作品与经历',
    allWorks: '查看全部项目', contact: '联系我', location: '上海市长宁区 · 东华大学延安路校区',
  },
  en: {
    eyebrow: 'HELLO, THIS IS MY CREATIVE UNIVERSE', roles: ['Human–Computer Interaction', 'AI-aided Design', 'Service Design'],
    intro: 'I love traveling, reading, visual media, and tinkering with unusual ideas in design and technology. This portfolio documents selected projects and learning experiences.',
    primary: 'View Projects', secondary: 'About Me', worksTitle: 'Projects & Experience',
    allWorks: 'View All Projects', contact: 'Contact', location: 'Donghua University, Shanghai',
  },
}

function App() {
  const { language, setLanguage, isEnglish } = useLanguage()
  const copy = HOME_COPY[language]
  const featuredWorks = WORKS.slice(0, 4).map((work) => localizeWork(work, language))
  const journeyRef = useRef(null)

  useEffect(() => {
    const section = journeyRef.current
    if (!section) return
    const progressPath = section.querySelector('.journey-line-progress')
    let raf = 0
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const progress = Math.min(1, Math.max(0, (vh * 0.6 - rect.top) / (rect.height || 1)))
      if (progressPath) progressPath.style.strokeDashoffset = String(1 - progress)
    }
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <div className="page-shell">
      <SiteHeader language={language} setLanguage={setLanguage} />
      <main>
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{isEnglish ? 'CHEN SIYU' : <>陈思羽<span>CHEN SIYU</span></>}</h1>
            <div className="role-list">{copy.roles.map((role) => <span key={role}>{role}</span>)}</div>
            <p className="home-intro">{copy.intro}</p>
            <div className="hero-actions">
              <Link to="/works" className="pill-button pill-button-primary"><Star />{copy.primary}</Link>
              <Link to="/profile" className="pill-button">{copy.secondary} ↗</Link>
            </div>
          </div>
          <div className="home-portrait" aria-label={isEnglish ? 'Portrait of Siyu Chen' : '陈思羽头像'}>
            <img src={`${import.meta.env.BASE_URL}avatar.png`} alt="陈思羽" />
            <span className="portrait-star portrait-star-large"><Star /></span>
            <span className="portrait-star portrait-star-small"><Star /></span>
          </div>
        </section>

        <section className="home-works" id="works">
          <div className="section-heading">
            <div><p className="section-kicker"><Star />SELECTED WORKS · 2025—2026</p><h2>{copy.worksTitle}</h2></div>
          </div>
          <div className="project-journey" ref={journeyRef}>
            <svg className="journey-line" viewBox="0 0 1200 1500" preserveAspectRatio="none" aria-hidden="true">
              <path className="journey-line-base" d="M72 20 C210 150,40 330,180 420 S1120 470,1080 700 S910 900,730 880 S90 860,90 1140 S290 1390,520 1460" />
              <path className="journey-line-progress" pathLength={1} d="M72 20 C210 150,40 330,180 420 S1120 470,1080 700 S910 900,730 880 S90 860,90 1140 S290 1390,520 1460" />
            </svg>
            {featuredWorks.map((work, index) => (
              <article className="journey-item" key={work.id}>
                <span className="journey-node"><Star /></span>
                <Link to={`/work/${work.id}`} className="journey-image"><img src={work.coverImage} alt={work.title} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" /></Link>
                <div className="journey-copy">
                  <small>{String(index + 1).padStart(2, '0')} · {work.period}</small>
                  <h3><Link to={`/work/${work.id}`}>{work.title}</Link></h3>
                  <p>{work.subtitle}</p>
                  <div className="tag-list">{work.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
          <div className="center-action"><Link to="/works" className="pill-button">{copy.allWorks} →</Link></div>
        </section>

        <section className="home-contact" id="contact">
          <div><h2>{copy.contact}</h2><p>{copy.location} · +86 19857125443</p></div>
          <a href="mailto:230613202@mail.dhu.edu.cn">230613202@mail.dhu.edu.cn ↗</a>
        </section>
      </main>
      <footer className="site-footer"><span>© 2026 CHEN SIYU</span><span>HCI · AI-AIDED DESIGN · SERVICE DESIGN</span></footer>
    </div>
  )
}

export default App
