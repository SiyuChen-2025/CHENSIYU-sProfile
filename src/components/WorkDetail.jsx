import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getWorkById } from '../data/works'

function WorkDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fashionFlowVideoRef = useRef(null)
  const workId = Number.parseInt(id ?? '', 10)
  const work = Number.isNaN(workId) ? null : getWorkById(workId)

  const isVisualCollection = work?.id === 8 || work?.id === 9
  const visualImages = work?.galleryImages?.length ? work.galleryImages : work ? [work.coverImage] : []
  const projectGalleryImages = !isVisualCollection && work?.galleryImages?.length ? work.galleryImages : []
  const projectDocuments = !isVisualCollection && work?.documents?.length ? work.documents : []
  const isFashionFlow = work?.slug === 'fashionflow' || work?.id === 2
  const isPosterGallery = work?.slug === 'stablediff-fabric'
  const isMixedGallery = work?.slug === 'aigc-art'
  const hasSummary = Boolean(work?.summary)
  const hasRoleInfo = Boolean(work?.responsibility || work?.advisor)
  const hasGalleryContent = projectGalleryImages.length > 0 || projectDocuments.length > 0 || isFashionFlow || Boolean(work?.outcome)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') navigate('/')
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [navigate])

  useEffect(() => {
    if (!isFashionFlow || !fashionFlowVideoRef.current) return

    // Most browsers only allow reliable autoplay when the video starts muted.
    const video = fashionFlowVideoRef.current
    const playPromise = video.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {})
    }
  }, [isFashionFlow, work?.id])

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
            {hasSummary ? (
              <article className="detail-section-card">
                <h2>项目概述</h2>
                <p>{work.summary}</p>
              </article>
            ) : null}

            {hasRoleInfo ? (
              <article className="detail-section-card">
                <div className="detail-meta-grid">
                  {work.responsibility ? (
                    <div className="detail-meta-item">
                      <span>负责部分</span>
                      <strong>{work.responsibility}</strong>
                    </div>
                  ) : null}
                  {work.advisor ? (
                    <div className="detail-meta-item">
                      <span>指导老师</span>
                      <strong>{work.advisor}</strong>
                    </div>
                  ) : null}
                </div>
              </article>
            ) : null}

            {/* 仅保留：成果展示（视频/图片/文本） */}
            {hasGalleryContent ? (
              <section className="detail-gallery-card">
                <h2>成果展示</h2>

                {isFashionFlow ? (
                  <div className="detail-video-wrap">
                    <video ref={fashionFlowVideoRef} controls autoPlay muted playsInline preload="metadata">
                      <source src={`${import.meta.env.BASE_URL}projects/FashionFLOW/FashionFLOW1.0.mp4`} type="video/mp4" />
                    </video>
                  </div>
                ) : null}

                {work.outcome ? <p className="detail-outcome-text" dangerouslySetInnerHTML={{ __html: work.outcome }} /> : null}

                {projectGalleryImages.length ? (
                  <div className={`detail-project-gallery${isPosterGallery ? ' detail-project-gallery--poster' : ''}${isMixedGallery ? ' detail-project-gallery--mixed' : ''}`}>
                    {projectGalleryImages.map((image, index) => (
                      <figure
                        key={`${image}-${index}`}
                        className={`detail-project-gallery-item${isPosterGallery ? ' detail-project-gallery-item--poster' : ''}${isMixedGallery ? ' detail-project-gallery-item--mixed' : ''}`}
                      >
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

                {projectDocuments.length ? (
                  <div className="detail-document-gallery">
                    {projectDocuments.map((document) => (
                      <article key={document.src} className="detail-document-card">
                        <div className="detail-document-head">
                          <h3>{document.title}</h3>
                          <a href={document.src} target="_blank" rel="noreferrer">
                            新窗口打开
                          </a>
                        </div>
                        <iframe
                          src={document.src}
                          title={document.title}
                          className="detail-document-frame"
                        />
                      </article>
                    ))}
                  </div>
                ) : null}

              </section>
            ) : null}
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
