import { Link } from 'react-router-dom'
import { WORKS } from '../data/works'

function WorksPage() {
  return (
    <div className="works-page">
      <header className="works-header">
        <div className="works-header-inner">
          <Link to="/" className="works-back-button">返回首页</Link>
          <h1>作品与经历</h1>
        </div>
      </header>

      <main className="works-main">
        <section className="works-list">
          {WORKS.map((work) => (
            <article key={work.id} className="works-list-item">
              <Link to={`/work/${work.id}`} className="works-list-link">
                <div className="works-list-thumb">
                  <img src={work.coverImage} alt={work.title} loading="lazy" decoding="async" />
                </div>
                <div className="works-list-content">
                  <h2>{work.title}</h2>
                  <p>{work.subtitle}</p>
                  <span>{work.period}</span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default WorksPage
