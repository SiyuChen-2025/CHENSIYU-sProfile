import { Link } from 'react-router-dom'
import { WORKS } from '../data/works'
import { localizeWork } from '../data/workTranslations'
import SiteHeader, { Star } from './SiteHeader'
import useLanguage from '../hooks/useLanguage'

function WorksPage() {
  const { language, setLanguage, isEnglish } = useLanguage()

  return (
    <div className="page-shell">
      <SiteHeader language={language} setLanguage={setLanguage} />
      <main className="works-main">
        <header className="page-intro">
          <p className="section-kicker"><Star />ALL PROJECTS · 2024—2026</p>
          <h1>{isEnglish ? 'Projects & Experience' : '作品与经历'}</h1>
          <p>{isEnglish ? 'A collection of research, interaction, service and visual design projects.' : '这里收录了科研、人机交互、服务设计与视觉创作项目。'}</p>
        </header>

        <section className="works-grid">
          {WORKS.map((sourceWork, index) => {
            const work = localizeWork(sourceWork, language)
            return (
            <article key={work.id} className="works-item">
              <Link to={`/work/${work.id}`} className="works-image">
                <img src={work.coverImage} alt={work.title} loading={index < 4 ? 'eager' : 'lazy'} decoding="async" />
              </Link>
              <div className="works-copy">
                <small>{String(index + 1).padStart(2, '0')} · {work.period}</small>
                <h2><Link to={`/work/${work.id}`}>{work.title}</Link></h2>
                <p>{work.subtitle}</p>
                <div className="tag-list">{work.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
            )
          })}
        </section>
      </main>
      <footer className="site-footer"><span>© 2026 CHEN SIYU</span><Link to="/">{isEnglish ? 'Back Home' : '返回首页'} ↑</Link></footer>
    </div>
  )
}

export default WorksPage
