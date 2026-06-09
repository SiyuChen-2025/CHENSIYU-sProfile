import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './VideoPage.css'

function VideoPage() {
  const videoRef = useRef(null)
  const navigate = useNavigate()

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

  return (
    <div className="video-page">
      <button className="back-button" onClick={() => navigate('/')}>
        返回
      </button>

      <div className="video-info">
        <h1 className="video-title">FashionFLOW</h1>
      
      <div className="video-container">
        <video 
          ref={videoRef}
          controls 
          autoPlay
          width="100%"
          style={{ borderRadius: '12px' }}
        >
          <source src={`${import.meta.env.BASE_URL}projects/FashionFLOW/FashionFLOW1.0.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      </div>
    </div>
  )
}

export default VideoPage
