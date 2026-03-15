import './App.css'

const LIVE_URL = 'https://siyuchen-2025.github.io/CHENSIYU-sProfile/'

function App() {
  const videos = [
    {
      id: 1,
      title: '我的旅行视频',
      description: '记录了我在欧洲的旅行经历',
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=travel%20video%20thumbnail%20europe%20landscape&image_size=landscape_16_9',
      videoUrl: 'https://www.example.com/video1'
    },
    {
      id: 2,
      title: '编程教程',
      description: 'React入门教程',
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=programming%20tutorial%20code%20editor&image_size=landscape_16_9',
      videoUrl: 'https://www.example.com/video2'
    },
    {
      id: 3,
      title: '生活日常',
      description: '分享我的日常生活',
      thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=daily%20life%20vlog%20home%20setting&image_size=landscape_16_9',
      videoUrl: 'https://www.example.com/video3'
    }
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--page-bg)' }}>
      {/* 导航栏 */}
      <nav className="profile-nav sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-lg font-bold text-slate-800">
              陈思羽 · CHEN SIYU
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <a href="#profile">个人资料</a>
              <a href="#videos">我的作品</a>
              <a href="#contact">联系我</a>
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="!bg-teal-700 !text-white hover:!bg-teal-800"
              >
                正式站 ↗
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        {/* 个人资料 */}
        <section id="profile" className="pt-10 pb-14">
          <div className="profile-hero p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="avatar-wrap">
              <img
                src={`${import.meta.env.BASE_URL}avatar.png`}
                alt="陈思羽"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover bg-slate-200"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" fill="none"><circle cx="96" cy="96" r="96" fill="#e5e7eb"/><circle cx="96" cy="76" r="28" fill="#9ca3af"/><path fill="#9ca3af" d="M96 116c-33 0-60 18-60 40v12h120v-12c0-22-27-40-60-40z"/></svg>')
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2>陈思羽</h2>
              <p className="sub">
                热爱旅行、编程和分享生活的个人博主。这里是我的个人空间，记录生活点滴和学习心得。
              </p>
              <div className="meta">
                <div className="meta-item">
                  <strong>兴趣爱好</strong>
                  旅行、编程、摄影、阅读
                </div>
                <div className="meta-item">
                  <strong>技能</strong>
                  React、JavaScript、Python
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 我的作品 */}
        <section id="videos" className="py-10">
          <h2 className="section-title">我的作品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <article key={video.id} className="video-card">
                <div className="relative pb-[56.25%]">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="play-btn w-14 h-14 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-800 mb-1">{video.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{video.description}</p>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link inline-block"
                  >
                    观看视频
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 联系我 */}
        <section id="contact" className="py-10">
          <h2 className="section-title">联系我</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="contact-card">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3>邮箱</h3>
              <p>chensiyu@example.com</p>
            </div>
            <div className="contact-card">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3>电话</h3>
              <p>+86 123 4567 8901</p>
            </div>
            <div className="contact-card">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3>地址</h3>
              <p>北京市朝阳区</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="profile-footer py-6 px-4 text-center">
        <p>
          © 2026 陈思羽 ·
          <a href={LIVE_URL} target="_blank" rel="noopener noreferrer"> 正式站</a>
        </p>
      </footer>
    </div>
  )
}

export default App
