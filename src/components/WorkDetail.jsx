import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getWorkById } from '../data/works'

function WorkDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const workId = Number.parseInt(id ?? '', 10)
  const work = Number.isNaN(workId) ? null : getWorkById(workId)
  const isVisualCollection = work?.id === 8 || work?.id === 9
  const visualImages = work?.galleryImages?.length ? work.galleryImages : work ? [work.coverImage] : []

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        navigate('/')
      }
    }

    document.addEventListener('keydown', handleEsc)
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [navigate])

  if (!work) {
    return (
      <div className="detail-empty-page">
        <div className="detail-empty-card">
          <h1>作品未找到</h1>
          <button onClick={() => navigate('/')} className="detail-back-button">
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-page">
      <header className="detail-header">
        <div className="detail-header-inner">
          <button onClick={() => navigate('/')} className="detail-back-button">
            返回首页
          </button>
          <div className="detail-title-wrap">
            <h1>{work.title}</h1>
            <p>{work.subtitle}</p>
          </div>
        </div>
      </header>
      <main className={isVisualCollection ? 'detail-main detail-main-visual' : 'detail-main'}>
        {isVisualCollection ? (
          <section className="detail-visual-wall">
            {visualImages.map((image, index) => (
              <figure key={`${image}-${index}`} className="detail-visual-item">
                <img src={image} alt={`${work.title}-${index + 1}`} />
              </figure>
            ))}
          </section>
        ) : (
          <>
            <section className="detail-hero-card">
              <img src={work.coverImage} alt={work.title} className="detail-cover-image" />
              <div className="detail-hero-content">
                <p className="detail-desc">{work.description}</p>
                <div className="detail-meta-grid">
                  <div className="detail-meta-item">
                    <span>项目周期</span>
                    <strong>{work.period}</strong>
                  </div>
                  <div className="detail-meta-item">
                    <span>项目关键词</span>
                    <strong>{work.tags.join(' · ')}</strong>
                  </div>
                </div>
              </div>
            </section>

            <section className="detail-section-grid">
              <article className="detail-section-card">
                <h2>项目概述</h2>
                <p>{work.summary}</p>
              </article>
              <article className="detail-section-card">
                <h2>问题与挑战</h2>
                <p>{work.challenge}</p>
              </article>
              <article className="detail-section-card">
                <h2>方案与过程</h2>
                <p>{work.solution}</p>
              </article>
              <article className="detail-section-card">
                <h2>结果与反思</h2>
                <p>{work.outcome}</p>
              </article>
            </section>

            <section className="detail-gallery-card">
              <h2>素材与成果展示区</h2>
              <p>你可以在这里补充最终视觉稿、流程图、视频或演示链接。</p>
            </section>
          </>
        )}
      </main>
      <footer className="detail-footer">
        <div className="detail-footer-inner">
          <p>© 2026 陈思羽</p>
        </div>
      </footer>
    </div>
  )
}

export default WorkDetail
