import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { PageLoading } from '../components/Loader/Loading'
import {
	AuthUser,
	clearAuth,
	readToken,
	readUser,
	writeToken,
	writeUser,
} from '../lib/authstorage'
import { AuthResponse, checkMe } from '../service/userApi'

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

type AuthCtx = {
	user: AuthUser | null
	token: string
	isLoggedIn: boolean
	status: AuthStatus
	setAuthFromResponse: (data: AuthResponse) => void
	logout: () => void
	checkMe: () => Promise<void>
}

const AuthContext = createContext<AuthCtx | null>(null)

async function fetchMe() {
	// backend: GET /api/auth/me -> { user: {...} } yoki user o'zini qaytaradi
	const res = await checkMe()
	return res
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState(() => readToken())
	const [user, setUser] = useState<AuthUser | null>(() => readUser())
	const [status, setStatus] = useState<AuthStatus>('checking')
	const [bootstrapped, setBootstrapped] = useState(false)

	const logout = () => {
		setToken('')
		setUser(null)
		clearAuth()
		setStatus('unauthenticated')
	}

	const checkMe = useCallback(async () => {
		const t = readToken()
		if (!t) {
			setToken('')
			setUser(null)
			clearAuth()
			setStatus('unauthenticated')
			return
		}

		try {
			setStatus('checking')
			const data = await fetchMe()
			const meUser = data?.user

			setToken(t)
			setUser(meUser)
			writeToken(t)
			writeUser(meUser)
			setStatus('authenticated')
		} catch {
			logout()
		}
	}, [])

	useEffect(() => {
		;(async () => {
			try {
				await checkMe()
			} finally {
				setBootstrapped(true) // ✅ nima bo‘lsa ham endi appni ochamiz
			}
		})()
	}, [checkMe])

	const isLoggedIn = status === 'authenticated'

	const value = useMemo(
		() => ({
			user,
			token,
			isLoggedIn,
			status,
			setAuthFromResponse: (data: AuthResponse) => {
				setToken(data.token)
				setUser(data.user)
				writeToken(data.token)
				writeUser(data.user)
				setStatus('authenticated')
			},
			logout,
			checkMe,
		}),
		[user, token, isLoggedIn, status, checkMe],
	)

	// ✅ Birinchi startda 100% faqat loader
	if (!bootstrapped) {
		return (
			<div className='bg-background min-h-screen'>
				<PageLoading text='Yuklanmoqda...' />
			</div>
		)
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}
