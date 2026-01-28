import React, {
	createContext,
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

type FetchMeType = {
	user: AuthUser
	state: number
}

async function fetchMe(token: string) {
	// backend: GET /api/auth/me -> { user: {...} } yoki user o'zini qaytaradi
	const res = await checkMe(token)
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

	const checkMe = async () => {
		const t = readToken()
		if (!t) {
			setToken('')
			setUser(null)
			setStatus('unauthenticated')
			return
		}

		try {
			setStatus('checking')
			const data = await fetchMe(t)
			const meUser = (data as FetchMeType).user ?? (data as FetchMeType)

			setToken(t)
			setUser(meUser)
			writeToken(t)
			writeUser(meUser)
			setStatus('authenticated')
		} catch {
			logout()
		}
	}

	useEffect(() => {
		;(async () => {
			try {
				await checkMe()
			} finally {
				setBootstrapped(true) // ✅ nima bo‘lsa ham endi appni ochamiz
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
		[user, token, status],
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
