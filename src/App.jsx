import './App.css'

function App() {
  // 模拟视频数据
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
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">陈思羽的个人网站</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#profile" className="text-gray-700 hover:text-blue-600">个人资料</a>
              <a href="#videos" className="text-gray-700 hover:text-blue-600">我的视频</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">联系我</a>
            </div>
          </div>
        </div>
      </nav>

      {/* 个人资料部分 */}
      <section id="profile" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <img 
                    src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20photo%20asian%20male&image_size=square_hd" 
                    alt="个人照片" 
                    className="w-48 h-48 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">陈思羽</h2>
                  <p className="text-gray-600 mb-6">
                    热爱旅行、编程和分享生活的个人博主。这里是我的个人空间，记录我的生活点滴和学习心得。
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">兴趣爱好</h3>
                      <p className="text-gray-600">旅行、编程、摄影、阅读</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">技能</h3>
                      <p className="text-gray-600">React、JavaScript、Python</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 视频展示部分 */}
      <section id="videos" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">我的视频</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="relative pb-[56.25%]">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-600 bg-opacity-80 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  <a 
                    href={video.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    观看视频
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系信息部分 */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">联系我</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <svg className="w-12 h-12 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-semibold text-gray-700 mb-2">邮箱</h3>
                  <p className="text-gray-600">chensiyu@example.com</p>
                </div>
                <div className="text-center">
                  <svg className="w-12 h-12 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <h3 className="font-semibold text-gray-700 mb-2">电话</h3>
                  <p className="text-gray-600">+86 123 4567 8901</p>
                </div>
                <div className="text-center">
                  <svg className="w-12 h-12 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-700 mb-2">地址</h3>
                  <p className="text-gray-600">北京市朝阳区</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2026 陈思羽的个人网站. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
