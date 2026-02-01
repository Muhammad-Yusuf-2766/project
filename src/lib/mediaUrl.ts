const API_BASE = import.meta.env.VITE_API_URL // masalan: http://localhost:4000

export function resolveImageUrl(path?: string) {
	if (!path) return '/placeholder.jpg'
	if (/^https?:\/\//i.test(path)) return path
	// siz DBda nima saqlashingizga qarab:
	return `${API_BASE}/static/products/${path.replace(/^\/+/, '')}`
}
