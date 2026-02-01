import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
	const { pathname, search, hash } = useLocation()

	useEffect(() => {
		// Agar link #section bo'lsa, browser o'zi o'sha elementga scroll qiladi
		if (hash) return

		// yangi route ochilganda tepaga qaytar
		window.scrollTo(0, 0)
	}, [pathname, search, hash])

	return null
}
