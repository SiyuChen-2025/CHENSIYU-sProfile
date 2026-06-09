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
  const projectGalleryImages = !isVisualCollection && work?.galleryImages?.length ? work.galleryImages : []
  const isFashionFlow = work?.slug === 'fashionflow' || work?.id === 2

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') navigate('/')
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [navigate])

  const backHome = () => navigate('/')

  if (!work) {
    return (
      <div className="detail-empty-page">
        <div className="detail-empty-card">
          <h1>作品未找到</h1>
          <button onClick={backHome} className="detail-back-button">
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
          <button onClick={backHome} className="detail-back-button">
            返回首页
          </button>
          <div className="detail-title-wrap">
            <h1>{work.title}</h1>
            {isVisualCollection ? null : <p>{work.subtitle}</p>}
          </div>
        </div>
      </header>

      <main className={`detail-main${isVisualCollection ? ' detail-main-visual' : ''}`}>
        {isVisualCollection ? (
          <div className="detail-visual-wall">
            {visualImages.map((image, index) => (
              <figure key={`${image}-${index}`} className="detail-visual-item">
                <img src={image} alt={`${work.title}-${index + 1}`} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        ) : (
          <>
            {/* 仅保留：项目周期 + 项目关键词 */}
            <article className="detail-section-card">
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
            </article>

            {/* 仅保留：项目概述 */}
            <article className="detail-section-card">
              <h2>项目概述</h2>
              <p>{work.summary}</p>
            </article>

            {/* 仅保留：成果展示（视频/图片/文本） */}
            <section className="detail-gallery-card">
              <h2>成果展示</h2>

              {projectGalleryImages.length ? (
                <div className="detail-project-gallery">
                  {projectGalleryImages.map((image, index) => (
                    <figure key={`${image}-${index}`} className="detail-project-gallery-item">
                      <img
                        src={image}
                        alt={`${work.title} 成果图 ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = work.coverImage
                        }}
                      />
                    </figure>
                  ))}
                </div>
              ) : null}

              {isFashionFlow ? (
                <div className="detail-video-wrap">
                  <video controls playsInline preload="metadata">
                    <source src={`${import.meta.env.BASE_URL}projects/FashionFLOW/FashionFLOW1.0.mp4`} type="video/mp4" />
                  </video>
                </div>
              ) : null}

              {work.outcome ? <p className="detail-outcome-text">{work.outcome}</p> : null}
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
