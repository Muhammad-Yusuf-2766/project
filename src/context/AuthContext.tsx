import React, { createContext, useContext, useMemo, useState } from 'react'
import {
	AuthUser,
	clearAuth,
	readToken,
	readUser,
	writeToken,
	writeUser,
} from '../lib/authstorage'
import { AuthResponse } from '../service/userApi'

type AuthCtx = {
	user: AuthUser | null
	token: string
	isLoggedIn: boolean
	setAuthFromResponse: (data: AuthResponse) => void
	logout: () => void
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState(() => readToken())
	const [user, setUser] = useState<AuthUser | null>(() => readUser())
	const isLoggedIn = !!token

	const setAuthFromResponse = (data: AuthResponse) => {
		setToken(data.token)
		setUser(data.user)
		writeToken(data.token)
		writeUser(data.user)
	}

	const logout = () => {
		setToken('')
		setUser(null)
		clearAuth()
	}

	const value = useMemo(
		() => ({ user, token, isLoggedIn, setAuthFromResponse, logout }),
		[user, token, isLoggedIn],
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}
