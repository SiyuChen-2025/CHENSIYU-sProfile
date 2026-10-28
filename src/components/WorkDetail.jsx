import { useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { WORKS, getWorkById } from '../data/works'
import { localizeWork } from '../data/workTranslations'
import SiteHeader from './SiteHeader'
import useLanguage from '../hooks/useLanguage'

const LABELS = {
  zh: { missing: '作品未找到', back: '返回首页', period: '项目周期', keywords: '项目关键词', overview: '项目概述', role: '负责部分', advisor: '指导老师', outcome: '成果展示', open: '新窗口打开', previous: '上一个项目', next: '下一个项目' },
  en: { missing: 'Project not found', back: 'Back Home', period: 'Period', keywords: 'Keywords', overview: 'Overview', role: 'Responsibilities', advisor: 'Advisors', outcome: 'Outcomes', open: 'Open in new window', previous: 'Previous Project', next: 'Next Project' },
}

function WorkDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const { language, setLanguage } = useLanguage()
  const labels = LABELS[language]
  const workId = Number.parseInt(id ?? '', 10)
  const sourceWork = Number.isNaN(workId) ? null : getWorkById(workId)
  const work = sourceWork ? localizeWork(sourceWork, language) : null

  const isVisualCollection = work?.id === 8 || work?.id === 9
  const visualImages = work?.galleryImages?.length ? work.galleryImages : work ? [work.coverImage] : []
  const projectGalleryImages = !isVisualCollection && work?.galleryImages?.length ? work.galleryImages : []
  const projectDocuments = !isVisualCollection && work?.documents?.length ? work.documents : []
  const isFashionFlow = work?.slug === 'fashionflow' || work?.id === 2
  const isPosterGallery = work?.slug === 'stablediff-fabric'
  const isMixedGallery = work?.slug === 'aigc-art'
  const hasVideo = Boolean(work?.video)
  const hasGalleryContent = projectGalleryImages.length > 0 || projectDocuments.length > 0 || isFashionFlow || hasVideo || Boolean(work?.outcome)

  const currentIndex = work ? WORKS.findIndex((item) => item.id === work.id) : -1
  const previousWork = currentIndex >= 0 ? localizeWork(WORKS[(currentIndex - 1 + WORKS.length) % WORKS.length], language) : null
  const nextWork = currentIndex >= 0 ? localizeWork(WORKS[(currentIndex + 1) % WORKS.length], language) : null

  useEffect(() => {
    window.scrollTo(0, 0)
    const handleEsc = (event) => { if (event.key === 'Escape') navigate('/works') }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [navigate, work?.id])

  useEffect(() => {
    if ((!isFashionFlow && !hasVideo) || !videoRef.current) return
    const promise = videoRef.current.play()
    if (promise?.catch) promise.catch(() => {})
  }, [isFashionFlow, hasVideo, work?.id])

  if (!work) {
    return <div className="empty-state"><h1>{labels.missing}</h1><Link className="pill-button" to="/">{labels.back}</Link></div>
  }

  return (
    <div className="page-shell">
      <SiteHeader language={language} setLanguage={setLanguage} />
      <main className="detail-main">
        <Link to="/works" className="text-link">← {language === 'en' ? 'All Projects' : '全部项目'}</Link>

        <header className="detail-hero">
          <div>
            <small>PROJECT {String(currentIndex + 1).padStart(2, '0')} / {String(WORKS.length).padStart(2, '0')}</small>
            <h1>{work.title}</h1>
            {!isVisualCollection && <p>{work.subtitle}</p>}
          </div>
          {work.summary && <p className="detail-summary">{work.summary}</p>}
        </header>

        {isVisualCollection ? (
          <section className="visual-wall">
            {visualImages.map((image, index) => <figure key={`${image}-${index}`}><img src={image} alt={`${work.title}-${index + 1}`} loading="lazy" decoding="async" /></figure>)}
          </section>
        ) : (
          <div className="detail-content">
            <section className="detail-meta">
              <div><small>01 · PERIOD</small><h2>{labels.period}</h2><p>{work.period}</p></div>
              <div><small>02 · KEYWORDS</small><h2>{labels.keywords}</h2><div className="tag-list">{work.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            </section>

            {work.summary && <section className="detail-section detail-overview"><small>03 · OVERVIEW</small><h2>{labels.overview}</h2><p>{work.summary}</p></section>}

            {(work.responsibility || work.advisor) && (
              <section className="detail-meta">
                {work.responsibility && <div><small>04 · ROLE</small><h2>{labels.role}</h2><p>{work.responsibility}</p></div>}
                {work.advisor && <div><small>05 · ADVISOR</small><h2>{labels.advisor}</h2><p>{work.advisor}</p></div>}
              </section>
            )}

            {hasGalleryContent && (
              <section className="detail-section detail-outcomes">
                <small>06 · OUTCOMES</small><h2>{labels.outcome}</h2>
                {(isFashionFlow || hasVideo) && <video ref={videoRef} controls muted playsInline preload="metadata"><source src={isFashionFlow ? `${import.meta.env.BASE_URL}projects/FashionFLOW/FashionFLOW1.0.mp4` : work.video} type="video/mp4" /></video>}
                {work.outcome && <p className="outcome-text" dangerouslySetInnerHTML={{ __html: work.outcome }} />}
                {projectGalleryImages.length > 0 && (
                  <div className={`project-gallery${isPosterGallery ? ' poster-gallery' : ''}${isMixedGallery ? ' mixed-gallery' : ''}`}>
                    {projectGalleryImages.map((image, index) => <figure key={`${image}-${index}`}><img src={image} alt={`${work.title} ${index + 1}`} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = work.coverImage }} /></figure>)}
                  </div>
                )}
                {projectDocuments.map((document) => (
                  <article className="document-viewer" key={document.src}>
                    <div><h3>{document.title}</h3><a href={document.src} target="_blank" rel="noreferrer">{labels.open} ↗</a></div>
                    <iframe src={document.src} title={document.title} />
                  </article>
                ))}
              </section>
            )}
          </div>
        )}

        <nav className="project-pager" aria-label="Project navigation">
          <Link to={`/work/${previousWork.id}`}><span>←</span><span><small>{labels.previous}</small><strong>{previousWork.title}</strong></span></Link>
          <Link to={`/work/${nextWork.id}`}><span><small>{labels.next}</small><strong>{nextWork.title}</strong></span><span>→</span></Link>
        </nav>
      </main>
      <footer className="site-footer"><span>© 2026 CHEN SIYU</span><Link to="/works">{language === 'en' ? 'All Projects' : '全部项目'} ↑</Link></footer>
    </div>
  )
}

export default WorkDetail
