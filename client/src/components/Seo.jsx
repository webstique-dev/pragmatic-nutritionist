import { useEffect } from 'react'
export function useSeo(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Meenu Balaji` : 'Meenu Balaji | Gut Health & Sports Nutritionist'
    const m = document.querySelector('meta[name="description"]')
    if (m && description) m.setAttribute('content', description)
  }, [title, description])
}
