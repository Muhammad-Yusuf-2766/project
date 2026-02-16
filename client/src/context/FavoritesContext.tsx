// favorites-context.tsx

import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { useAuth } from './AuthContext'

type FavoritesCtx = {
	likedIds: Set<string>
	isLiked: (id: string) => boolean
	setLiked: (id: string, liked: boolean) => void
	hydrate: (ids: string[]) => void
	ready: boolean
}

const FavoritesContext = createContext<FavoritesCtx | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
	const { user } = useAuth()
	const [likedIdsState, setLikedIdsState] = useState<Set<string>>(
		() => new Set(),
	)
	const [ready, setReady] = useState(false)

	const hydrate = (ids: string[]) => {
		setLikedIdsState(new Set(ids))
	}

	const setLiked = (id: string, liked: boolean) => {
		setLikedIdsState(prev => {
			const next = new Set(prev)
			if (liked) next.add(id)
			else next.delete(id)
			return next
		})
	}

	useEffect(() => {
		if (user?._id) {
			const ids = (user.favorites ?? []).map((x: string) =>
				typeof x === 'string' ? x : String(x),
			)
			hydrate(ids)
			setReady(true)
		} else {
			hydrate([]) // logout bo‘lsa reset
			setReady(false)
		}
	}, [user])

	const value = useMemo(() => {
		const likedIds = likedIdsState
		return {
			likedIds,
			isLiked: (id: string) => likedIds.has(id),
			setLiked,
			hydrate,
			ready,
		}
	}, [likedIdsState, ready])

	return (
		<FavoritesContext.Provider value={value}>
			{children}
		</FavoritesContext.Provider>
	)
}

export function useFavorites() {
	const ctx = useContext(FavoritesContext)
	if (!ctx)
		throw new Error('useFavorites must be used within FavoritesProvider')
	return ctx
}
