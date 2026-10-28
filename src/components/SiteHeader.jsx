import { Link, useNavigate } from 'react-router-dom'

function Star() {
  return <span className="four-star" aria-hidden="true" />
}

export default function SiteHeader({ language, setLanguage }) {
  const isEnglish = language === 'en'
  const navigate = useNavigate()

  const goToContact = (event) => {
    event.preventDefault()
    navigate('/')
    window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 60)
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-brand" aria-label={isEnglish ? 'Home' : '首页'}>
          <Star />
          <span>
            <strong>陈思羽</strong>
            <small>CHEN SIYU · PORTFOLIO</small>
          </span>
        </Link>

        <nav className="site-links" aria-label={isEnglish ? 'Main navigation' : '主导航'}>
          <Link to="/profile">{isEnglish ? 'About' : '关于我'}</Link>
          <Link to="/works">{isEnglish ? 'Projects' : '项目经历'}</Link>
          <a href="#contact" onClick={goToContact}>{isEnglish ? 'Contact' : '联系我'}</a>
        </nav>

        <button
          type="button"
          className="language-toggle"
          onClick={() => setLanguage(isEnglish ? 'zh' : 'en')}
          aria-label={isEnglish ? '切换到中文' : 'Switch to English'}
        >
          {isEnglish ? '中' : 'EN'}
        </button>
      </div>
    </header>
  )
}

export { Star }
