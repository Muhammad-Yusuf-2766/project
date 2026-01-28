// authStorage.ts
export type AuthUser = {
	_id: string
	fullName: string
	phone: string
	role: 'admin' | 'seller' | 'user'
}

const TOKEN_KEY = 'auth:token'
const USER_KEY = 'auth:user'

export function readToken() {
	return localStorage.getItem(TOKEN_KEY) || ''
}

export function writeToken(token: string) {
	localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
	localStorage.removeItem(TOKEN_KEY)
}

export function readUser(): AuthUser | null {
	try {
		const raw = localStorage.getItem(USER_KEY)
		return raw ? (JSON.parse(raw) as AuthUser) : null
	} catch {
		return null
	}
}

export function writeUser(user: AuthUser) {
	localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearUser() {
	localStorage.removeItem(USER_KEY)
}

export function clearAuth() {
	clearToken()
	clearUser()
}
