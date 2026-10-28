import { useEffect, useState } from 'react'

const LANGUAGE_EVENT = 'portfolio-language-change'

export default function useLanguage() {
  const [language, setLanguageState] = useState(() => localStorage.getItem('portfolio-language') || 'zh')

  useEffect(() => {
    const sync = (event) => setLanguageState(event.detail || localStorage.getItem('portfolio-language') || 'zh')
    window.addEventListener(LANGUAGE_EVENT, sync)
    return () => window.removeEventListener(LANGUAGE_EVENT, sync)
  }, [])

  const setLanguage = (nextLanguage) => {
    localStorage.setItem('portfolio-language', nextLanguage)
    setLanguageState(nextLanguage)
    window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: nextLanguage }))
  }

  return { language, setLanguage, isEnglish: language === 'en' }
}
